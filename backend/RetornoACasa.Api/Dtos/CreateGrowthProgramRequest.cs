using System.ComponentModel.DataAnnotations;

namespace RetornoACasa.Api.Dtos;

public class CreateGrowthProgramRequest
{
    [Required]
    [MaxLength(120)]
    public string Title { get; init; } = string.Empty;

    [Required]
    [MaxLength(800)]
    public string Description { get; init; } = string.Empty;

    [Required]
    [MaxLength(80)]
    public string Category { get; init; } = string.Empty;
}
