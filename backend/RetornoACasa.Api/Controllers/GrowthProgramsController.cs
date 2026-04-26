using Microsoft.AspNetCore.Mvc;
using RetornoACasa.Api.Dtos;
using RetornoACasa.Api.Services;

namespace RetornoACasa.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GrowthProgramsController : ControllerBase
{
    private readonly IGrowthProgramService _service;

    public GrowthProgramsController(IGrowthProgramService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<GrowthProgramDto>>> GetAll(CancellationToken cancellationToken)
    {
        var items = await _service.GetAllAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<GrowthProgramDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var item = await _service.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<GrowthProgramDto>> Create(
        [FromBody] CreateGrowthProgramRequest request,
        CancellationToken cancellationToken)
    {
        var created = await _service.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}
