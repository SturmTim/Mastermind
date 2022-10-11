using MastermindBackend.Dtos;

namespace MastermindBackend.Services;

public class GameService
{
    private List<Game> Games = new ();
    
    private static readonly string[] Colors = new[]
    {
        "red", "yellow", "blue", "green", "orange", "brown"
    };
    
    private static Random random = new Random();

    public static string RandomString(int length)
    {
        const string chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }
    
    public static string[] GetRandomColors()
    {
        var colors = new List<string>();
        while (colors.Count < 4)
        {
            var color = Colors[random.Next(Colors.Length)];
            if (!colors.Contains(color))
            {
                colors.Add(color);
            }
        }

        return colors.ToArray();
    }
    
    

    public Game AddGame(GameStartDto gameStart)
    {
        var game = new Game
        {
            Id = RandomString(6),
            MaxGuesses = gameStart.MaxGuesses,
            Guesses = new Guess[] { },
            Solution = GetRandomColors(),
            User = gameStart.User,
             
        };
        Games.Add(game);
        return game;
    }
    
    public string[] GetColors()
    {
        return Colors;
    }
    
    public Game GetGame(string id)
    {
        return Games.First(g => g.Id == id);
    }
    
    public Guess AddGuess(string gameId, MakeGuessDto guess)
    {
        var game = Games.FirstOrDefault(g => g.Id == gameId);
        if (game == null)
        {
            return null;
        }
        
        var guessResult = new Guess
        { 
            Colors = guess.Colors,
            CorrectColor = 0,
            CorrectColorAndPosition = 0
        };
        
        for (var i = 0; i < game.Solution.Length; i++)
        {
            if (game.Solution[i] == guess.Colors[i])
            {
                guessResult.CorrectColorAndPosition++;
            }
            else if (game.Solution.Contains(guess.Colors[i]))
            {
                guessResult.CorrectColor++;
            }
        }
        
        game.Guesses = game.Guesses.Append(guessResult).ToArray();

        return guessResult;
    }

}