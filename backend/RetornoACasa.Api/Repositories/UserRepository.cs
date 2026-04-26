using Microsoft.EntityFrameworkCore;
using RetornoACasa.Api.Data;
using RetornoACasa.Api.Models;

namespace RetornoACasa.Api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public UserRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<AppUser?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(
            x => x.Email == email,
            cancellationToken);
    }

    public async Task<AppUser> AddAsync(AppUser user, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return user;
    }
}
