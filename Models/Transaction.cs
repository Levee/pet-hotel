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
        public string name { get; set; }

        public string trans { get; set; }

        public int transact { get; set; }
        
        public Nullable<int> checkedInAt { get; set; }

        public void checkIn() {
            checkedInAt = 1;
        }

        public void checkOut() {
            checkedInAt = null;
        }
    }
}
