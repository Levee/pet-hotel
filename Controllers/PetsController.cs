using System.Net.NetworkInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pet_hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PetsController(ApplicationContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPets() {
            return Ok(_context.pets.Include(p => p.petOwner).ToList().OrderBy(p => p.id));
        }

        [HttpPost]
        public IActionResult NewPet([FromBody] Pet pet) {
            PetOwner petOwner = _context.petOwners.SingleOrDefault(p => p.id == pet.petOwnerid);
            if (petOwner == null) {
                return BadRequest();
            }
            
            _context.Add(pet);
            _context.SaveChanges();
            return CreatedAtAction(nameof(NewPet), new {id = pet.id}, pet);
        }

        [HttpDelete("{id}")]
        public IActionResult PutDown(int id) {
            Pet pet = _context.pets.SingleOrDefault(pet => pet.id == id);
            if (pet == null) {
                return NotFound(
                    new { error = $"Error. We couldn't find your pet with id {id}. We can't put it down" }
                );
            }
            _context.pets.Remove(pet);
            _context.SaveChanges();
            return NoContent();
        }
        
        [HttpPut("{id}")]
        public IActionResult RebirthPet(int id, [FromBody] Pet pet){
            if(id != pet.id){
                return BadRequest(
                    new {error = $"pet id {id} must match route id"}
                );
            }
            if(!_context.pets.Any(p => p.id == id)){
                return NotFound(
                    new {error = $"pet id {id} not found"}
                );
            }
            _context.Update(pet);
            _context.SaveChanges();
            return Ok(pet);
        }

        [HttpPut("{id}/checkin")]
        public IActionResult CheckIn(int id) {            
            Pet pet = _context.pets.SingleOrDefault(p => p.id == id);
            if (pet == null) return NotFound();
            pet.checkIn();
            _context.Update(pet);
            _context.SaveChanges();
            return Ok(pet);
        }

        [HttpPut("{id}/checkout")]
        public IActionResult CheckOut(int id) {            
            Pet pet = _context.pets.SingleOrDefault(p => p.id == id);
            if (pet == null) return NotFound();
            pet.checkOut();
            _context.Update(pet);
            _context.SaveChanges();
            return Ok(pet);
        }
    }
}
