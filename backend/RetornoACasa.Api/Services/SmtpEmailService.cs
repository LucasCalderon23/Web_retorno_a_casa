using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using RetornoACasa.Api.Configuration;

namespace RetornoACasa.Api.Services;

public class SmtpEmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IOptions<SmtpSettings> smtpOptions, ILogger<SmtpEmailService> logger)
    {
        _smtpSettings = smtpOptions.Value;
        _logger = logger;
    }

    public async Task SendWelcomeEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        if (!_smtpSettings.Enabled)
        {
            _logger.LogInformation(
                "SMTP deshabilitado. Simulando email de bienvenida para {Email}.",
                email);
            return;
        }

        using var message = new MailMessage
        {
            From = new MailAddress(_smtpSettings.FromEmail, _smtpSettings.FromName),
            Subject = "Bienvenido a Retorno a Casa",
            Body =
                "Gracias por registrarte. Tu cuenta fue creada correctamente y ya podes iniciar sesion.",
            IsBodyHtml = false
        };

        message.To.Add(email);

        using var smtpClient = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password)
        };

        using var registration = cancellationToken.Register(() => smtpClient.SendAsyncCancel());
        await smtpClient.SendMailAsync(message, cancellationToken);
    }
}
