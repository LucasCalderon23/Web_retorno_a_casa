using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetornoACasa.Api.Security;

namespace RetornoACasa.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = RoleNames.Admin)]
public class AdminController : ControllerBase
{
    [HttpGet("health")]
    public ActionResult<object> GetAdminHealth()
    {
        return Ok(new
        {
            message = "Acceso admin autorizado.",
            serverTimeUtc = DateTime.UtcNow
        });
    }
}
