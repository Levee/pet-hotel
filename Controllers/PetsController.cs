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
        public IEnumerable<Pet> GetPets() {
            return _context.pets.Include(p => p.ownedBy).ToList();
        }

        [HttpPost]
        public IActionResult NewPet([FromBody] Pet pet) {
            PetOwner owner = _context.petOwners.SingleOrDefault(p => p.id == pet.ownedByid);
            if (owner == null) {
                return BadRequest();
            }
            
            _context.Add(pet);
            _context.SaveChanges();
            return Ok(pet);
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
        // [HttpGet]
        // [Route("test")]
        // public IEnumerable<Pet> GetPets() {
        //     PetOwner blaine = new PetOwner{
        //         name = "Blaine"
        //     };

        //     Pet newPet1 = new Pet {
        //         name = "Big Dog",
        //         petOwner = blaine,
        //         color = PetColorType.Black,
        //         breed = PetBreedType.Poodle,
        //     };

        //     Pet newPet2 = new Pet {
        //         name = "Little Dog",
        //         petOwner = blaine,
        //         color = PetColorType.Golden,
        //         breed = PetBreedType.Labrador,
        //     };

        //     return new List<Pet>{ newPet1, newPet2};
        // }
    }
}
