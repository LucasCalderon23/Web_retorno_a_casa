namespace RetornoACasa.Api.Dtos;

public class AuthResponse
{
    public string Token { get; init; } = string.Empty;
    public DateTime ExpiresAtUtc { get; init; }
}
