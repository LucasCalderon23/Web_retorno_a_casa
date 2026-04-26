namespace RetornoACasa.Api.Configuration;

public class AdminSeedSettings
{
    public const string SectionName = "AdminSeed";

    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
}
