using System.Collections.Generic;
using System;
using System.Linq;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace pet_hotel
{
    public class PetOwner {
        public int id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        [EmailAddress]
        public string emailAddress { get; set; }

        [JsonIgnore]
        public ICollection<Pet> myPets { get; set; }

        [NotMapped]
        public int petCount {
            get {
                return (
                    this.myPets != null
                    ? this.myPets.Count
                    : 0
                );
            }
        }
    }
}
