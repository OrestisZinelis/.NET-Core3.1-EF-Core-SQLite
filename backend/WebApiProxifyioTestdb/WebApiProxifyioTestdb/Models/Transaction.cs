using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiProxifyioTestdb.Models
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        [Required]
        public Guid id { get; set; }

        [Required]
        public Guid account_id { get; set; }

        [Required]
        public decimal? amount { get; set; }
    }
}
