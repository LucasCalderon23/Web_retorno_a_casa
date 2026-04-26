using RetornoACasa.Api.Dtos;
using RetornoACasa.Api.Models;
using RetornoACasa.Api.Repositories;

namespace RetornoACasa.Api.Services;

public class GrowthProgramService : IGrowthProgramService
{
    private readonly IGrowthProgramRepository _repository;

    public GrowthProgramService(IGrowthProgramRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<GrowthProgramDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var items = await _repository.GetAllAsync(cancellationToken);
        return items.Select(MapToDto).ToList();
    }

    public async Task<GrowthProgramDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var item = await _repository.GetByIdAsync(id, cancellationToken);
        return item is null ? null : MapToDto(item);
    }

    public async Task<GrowthProgramDto> CreateAsync(
        CreateGrowthProgramRequest request,
        CancellationToken cancellationToken = default)
    {
        var newItem = new GrowthProgram
        {
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            Category = request.Category.Trim()
        };

        var savedItem = await _repository.AddAsync(newItem, cancellationToken);
        return MapToDto(savedItem);
    }

    private static GrowthProgramDto MapToDto(GrowthProgram item)
    {
        return new GrowthProgramDto
        {
            Id = item.Id,
            Title = item.Title,
            Description = item.Description,
            Category = item.Category
        };
    }
}
