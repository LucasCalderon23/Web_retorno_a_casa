using RetornoACasa.Api.Models;

namespace RetornoACasa.Api.Repositories;

public interface IUserRepository
{
    Task<AppUser?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<AppUser> AddAsync(AppUser user, CancellationToken cancellationToken = default);
}
