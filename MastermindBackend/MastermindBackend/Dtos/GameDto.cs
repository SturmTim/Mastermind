namespace MastermindBackend.Dtos;

public class GameDto
{
    public string Id { get; set; }
    public string? User { get; set; }
    public int? MaxGuesses { get; set; }
    public Guess[] Guesses { get; set; } = Array.Empty<Guess>();
}