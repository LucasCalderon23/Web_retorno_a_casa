namespace RetornoACasa.Api.Services;

public interface IEmailService
{
    Task SendWelcomeEmailAsync(string email, CancellationToken cancellationToken = default);
}
