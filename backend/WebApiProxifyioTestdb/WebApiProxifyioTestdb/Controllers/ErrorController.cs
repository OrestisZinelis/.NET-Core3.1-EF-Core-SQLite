using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebApiProxifyioTestdb.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("/error-local-development")]
        public IActionResult ErrorLocalDevelopment(
        [FromServices] IWebHostEnvironment webHostEnvironment)
        {
            if (webHostEnvironment.EnvironmentName != "Development")
            {
                throw new InvalidOperationException(
                    "This shouldn't be invoked in non-development environments.");
            }

            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context?.Error;
            int code = 400; // Internal Server Error by default

            return Problem(
                detail: context.Error.StackTrace,
                title: context.Error.Message,
                statusCode: code);
        }

        [Route("/error")]
        public IActionResult Error() => Problem();
    }
}
