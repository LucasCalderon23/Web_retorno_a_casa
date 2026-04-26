namespace RetornoACasa.Api.Services;

public interface IAdminSeedService
{
    Task EnsureAdminUserAsync(CancellationToken cancellationToken = default);
}
