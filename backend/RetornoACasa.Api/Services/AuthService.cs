using Microsoft.AspNetCore.Identity;
using RetornoACasa.Api.Dtos;
using RetornoACasa.Api.Models;
using RetornoACasa.Api.Repositories;
using RetornoACasa.Api.Security;

namespace RetornoACasa.Api.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<AppUser> _passwordHasher;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher<AppUser> passwordHasher,
        IJwtTokenService jwtTokenService,
        IEmailService emailService,
        ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenService = jwtTokenService;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<AuthResponse?> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var existingUser = await _userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);
        if (existingUser is not null)
        {
            return null;
        }

        var user = new AppUser
        {
            Email = normalizedEmail,
            Role = RoleNames.Usuario,
            CreatedAtUtc = DateTime.UtcNow
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password.Trim());
        var savedUser = await _userRepository.AddAsync(user, cancellationToken);

        try
        {
            await _emailService.SendWelcomeEmailAsync(savedUser.Email, cancellationToken);
        }
        catch (Exception exception)
        {
            _logger.LogWarning(exception, "No se pudo enviar email de bienvenida a {Email}.", savedUser.Email);
        }

        var (token, expiresAtUtc) = _jwtTokenService.GenerateToken(savedUser);

        return new AuthResponse
        {
            Token = token,
            ExpiresAtUtc = expiresAtUtc
        };
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var user = await _userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var verificationResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password.Trim());

        if (verificationResult == PasswordVerificationResult.Failed)
        {
            return null;
        }

        var (token, expiresAtUtc) = _jwtTokenService.GenerateToken(user);
        return new AuthResponse
        {
            Token = token,
            ExpiresAtUtc = expiresAtUtc
        };
    }
}
