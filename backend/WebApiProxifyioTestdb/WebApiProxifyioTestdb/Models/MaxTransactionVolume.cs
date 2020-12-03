using System;
using System.Collections.Generic;

namespace WebApiProxifyioTestdb.Models
{
    public class MaxTransactionVolume
    {
        public decimal maxVolume { get; set; }
        public List<Guid> accounts { get; set; }
    }
}
