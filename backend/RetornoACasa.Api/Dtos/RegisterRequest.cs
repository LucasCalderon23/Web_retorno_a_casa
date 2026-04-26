using System.ComponentModel.DataAnnotations;

namespace RetornoACasa.Api.Dtos;

public class RegisterRequest
{
    [Required]
    [EmailAddress]
    [MaxLength(160)]
    public string Email { get; init; } = string.Empty;

    [Required]
    [MinLength(8)]
    [MaxLength(128)]
    public string Password { get; init; } = string.Empty;
}
