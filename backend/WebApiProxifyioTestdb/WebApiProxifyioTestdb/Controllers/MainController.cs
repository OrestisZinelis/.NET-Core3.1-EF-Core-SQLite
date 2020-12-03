using Microsoft.AspNetCore.Mvc;
using WebApiProxifyioTestdb.Models;
using WebApiProxifyioTestdb.Services;

namespace WebApiProxifyioTestdb.Controllers
{
    [Route("api")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly IAmountService _amountService;

        public MainController(IAmountService amountService)
        {
            _amountService = amountService;
        }

        [Route("max_transaction_volume")]
        [HttpGet]
        public ActionResult<MaxTransactionVolume> GetMaxTransactionVolume()
        {
            return _amountService.GetMaxTransactionVolume();
        }
    }
}
