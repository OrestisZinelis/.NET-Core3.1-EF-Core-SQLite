using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApiProxifyioTestdb.Models;
using WebApiProxifyioTestdb.Services;

namespace WebApiProxifyioTestdb.Controllers
{
    [Route("api/balance")]
    [ApiController]

    public class BalanceController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public BalanceController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetBalanceAmountFromAccountByAccountId(Guid id)
        {
            var account = await _accountService.GetAccountById(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;        //return Ok(account);

        }
    }
}
