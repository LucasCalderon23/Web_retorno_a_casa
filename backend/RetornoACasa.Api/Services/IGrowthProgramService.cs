using RetornoACasa.Api.Dtos;

namespace RetornoACasa.Api.Services;

public interface IGrowthProgramService
{
    Task<IReadOnlyList<GrowthProgramDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<GrowthProgramDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<GrowthProgramDto> CreateAsync(CreateGrowthProgramRequest request, CancellationToken cancellationToken = default);
}
