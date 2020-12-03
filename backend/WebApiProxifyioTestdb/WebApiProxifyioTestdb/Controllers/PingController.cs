using Microsoft.AspNetCore.Mvc;

namespace WebApiProxifyioTestdb.Controllers
{
    [ApiController]
    [Route("api/ping")]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return new ContentResult()
            {
                StatusCode = 200,
            };
        }
    }
}
