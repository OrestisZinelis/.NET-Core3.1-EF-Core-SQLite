using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.Models;
using WebApiProxifyioTestdb.Services;

namespace WebApiProxifyioTestdb.Controllers
{
    [Route("api/amount")]
    [ApiController]

    public class AmountController : ControllerBase
    {
        private readonly IAmountService _service;
        public AmountController(IAmountService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction arg)
        {
            string transactionId = Request.Headers["Transaction-Id"];
            arg.id = new Guid(transactionId);
            var createTransactionStatus = await _service.CreateTransaction(arg);
            if (!createTransactionStatus)
            {
                return BadRequest("Save failed");
            }
            return Ok();
        }
    }
}
