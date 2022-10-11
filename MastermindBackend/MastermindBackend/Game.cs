using System.Drawing;

namespace MastermindBackend;

public class Game
{
    public string Id { get; set; }
    public string? User { get; set; }
    public int? MaxGuesses { get; set; }
    public Guess[] Guesses { get; set; } = Array.Empty<Guess>();
    public string[]? Solution { get; set; }
}

public class Guess
{
    public string[]? Colors { get; set; }
    public int? CorrectColorAndPosition { get; set; }
    public int? CorrectColor { get; set; }
}
