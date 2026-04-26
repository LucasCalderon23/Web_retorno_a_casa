using Microsoft.EntityFrameworkCore;
using RetornoACasa.Api.Data;
using RetornoACasa.Api.Models;

namespace RetornoACasa.Api.Repositories;

public class GrowthProgramRepository : IGrowthProgramRepository
{
    private readonly AppDbContext _dbContext;

    public GrowthProgramRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<GrowthProgram>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.GrowthPrograms
            .AsNoTracking()
            .OrderBy(x => x.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task<GrowthProgram?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.GrowthPrograms
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<GrowthProgram> AddAsync(GrowthProgram program, CancellationToken cancellationToken = default)
    {
        _dbContext.GrowthPrograms.Add(program);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return program;
    }
}
