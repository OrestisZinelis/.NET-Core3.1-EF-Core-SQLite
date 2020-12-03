using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiProxifyioTestdb.Models
{
    [Table("Accounts")]
    public class Account
    {
        [Required]
        public decimal balance { get; set; }

        [Required]
        [Key]
        public Guid id { get; set; }
    }
}
