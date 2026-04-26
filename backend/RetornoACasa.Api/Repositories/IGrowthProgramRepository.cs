using RetornoACasa.Api.Models;

namespace RetornoACasa.Api.Repositories;

public interface IGrowthProgramRepository
{
    Task<IReadOnlyList<GrowthProgram>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<GrowthProgram?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<GrowthProgram> AddAsync(GrowthProgram program, CancellationToken cancellationToken = default);
}
