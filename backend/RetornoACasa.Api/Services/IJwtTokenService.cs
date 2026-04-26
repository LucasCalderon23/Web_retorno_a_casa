using RetornoACasa.Api.Models;

namespace RetornoACasa.Api.Services;

public interface IJwtTokenService
{
    (string Token, DateTime ExpiresAtUtc) GenerateToken(AppUser user);
}
