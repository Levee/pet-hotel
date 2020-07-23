using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace pet_hotel
{

    public class Transaction
    {
        public int id { get; set; }

        [Required]
        public string title { get; set; }
        
        [Required]
        public DateTime timestamp  { get; set; }

        public void takeAction(){
            timestamp = DateTime.Now;
        }
    }
}
