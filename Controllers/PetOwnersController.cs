using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pet_hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetOwnersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PetOwnersController(ApplicationContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<PetOwner> GetOwners()
        {
            return _context.petOwners.Include(p => p.myPets).ToList();
        }

        [HttpGet("{id}")]
        public IActionResult GetOwner(int id)
        {
            PetOwner owner = _context.petOwners.SingleOrDefault(o => o.id == id);
            if (owner == null)
            {
                return NotFound(
                    new { error = $"Error, baker with id {id} not found!" }
                );
            }
            return Ok(owner);
        }

        [HttpPost]
        public IActionResult NewPetOwner([FromBody] PetOwner petOwner)
        {
            _context.Add(petOwner); // add to our local database layer
            _context.SaveChanges(); // actually save to the database
            // return Ok(baker); // TODO: Change from 200 OK to 201 CREATED
            return CreatedAtAction(nameof(GetOwner), new { id = petOwner.id }, petOwner);
        }

        [HttpDelete("{id}")]
        public IActionResult Execute(int id)
        {
            PetOwner owner = _context.petOwners.SingleOrDefault(owner => owner.id == id);
            if (owner == null)
            {
                return NotFound(
                    new { error = $"Error. We couldn't find your pet with id {id}. We can't put it down" }
                );
            }
            _context.petOwners.Remove(owner);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult RebirthPetOwner(int id, [FromBody] PetOwner petOwner)
        {
            if (id != petOwner.id)
            {
                return BadRequest(
                    new { error = $"petOwner id {id} must match route id" }
                );
            }
            if (!_context.petOwners.Any(p => p.id == id))
            {
                return NotFound(
                    new { error = $"petOwner id {id} not found" }
                );
            }
            _context.Update(petOwner);
            _context.SaveChanges();
            return Ok(petOwner);
        }
    }
}
