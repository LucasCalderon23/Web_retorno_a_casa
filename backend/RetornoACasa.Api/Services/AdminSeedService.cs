using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using RetornoACasa.Api.Configuration;
using RetornoACasa.Api.Models;
using RetornoACasa.Api.Repositories;
using RetornoACasa.Api.Security;

namespace RetornoACasa.Api.Services;

public class AdminSeedService : IAdminSeedService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<AppUser> _passwordHasher;
    private readonly AdminSeedSettings _adminSeedSettings;

    public AdminSeedService(
        IUserRepository userRepository,
        IPasswordHasher<AppUser> passwordHasher,
        IOptions<AdminSeedSettings> adminSeedOptions)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _adminSeedSettings = adminSeedOptions.Value;
    }

    public async Task EnsureAdminUserAsync(CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_adminSeedSettings.Email) || string.IsNullOrWhiteSpace(_adminSeedSettings.Password))
        {
            return;
        }

        var email = _adminSeedSettings.Email.Trim().ToLowerInvariant();
        var existing = await _userRepository.GetByEmailAsync(email, cancellationToken);
        if (existing is not null)
        {
            return;
        }

        var admin = new AppUser
        {
            Email = email,
            Role = RoleNames.Admin,
            CreatedAtUtc = DateTime.UtcNow
        };

        admin.PasswordHash = _passwordHasher.HashPassword(admin, _adminSeedSettings.Password.Trim());
        await _userRepository.AddAsync(admin, cancellationToken);
    }
}
