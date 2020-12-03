using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.Models;
using WebApiProxifyioTestdb.Services;

namespace WebApiProxifyioTestdb.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionsService _service;
        public TransactionController(ITransactionsService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(string id)
        {
            var transaction = await _service.GetTransaction(new Guid(id));

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }
    }
}
