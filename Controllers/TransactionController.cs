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
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public TransactionsController(ApplicationContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTransactions() {
            return Ok(_context.transactions.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetTransaction(int id) {
            Transaction transaction = _context.transactions.SingleOrDefault(o => o.id == id);
            if (transaction == null) {
                return NotFound(
                    new { error = $"Error, baker with id {id} not found!" }
                );
            }
            return Ok(transaction);
        }

        [HttpPost]
        public IActionResult NewTransaction([FromBody] Transaction transaction) {
            transaction.takeAction();
            _context.Add(transaction); // add to our local database layer
            _context.SaveChanges(); // actually save to the database
            // return Ok(baker); // TODO: Change from 200 OK to 201 CREATED
            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.id }, transaction);
        }
    }
}
