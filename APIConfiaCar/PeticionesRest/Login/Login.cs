using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace APIConfiaCar.PeticionesRest.Login
{
    public class Login
    {
        // [Required]
        // [MinLength(1)]
        // [MaxLength(20)]
        public string Usuario { get; set; }

        //[Required]
        // [MinLength(1)]
        // [MaxLength(20)]
        public string Password { get; set; }
    }

    public class LoginApp
    {
        public string Usuario { get; set; }
        public string Password { get; set; }

        public string UUID { get; set; }
    }
}
