using MastermindBackend.Dtos;
using MastermindBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace MastermindBackend.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{

    public GameService _GameService;

    public GameController(GameService gameService)
    {
        _GameService = gameService;
    }

    [HttpGet("Colors")]
    public List<string> GetColors()
    {
        return _GameService.GetColors().ToList();
    }
    
    [HttpGet("{id}")]
    public GameDto GetGame(string id)
    {
        return new GameDto().CopyPropertiesFrom(_GameService.GetGame(id));
    }
    
    [HttpPost]
    public GameDto StartGame([FromBody] GameStartDto gameStartDto)
    {
        Game newGame = _GameService.AddGame(gameStartDto);
        return new GameDto().CopyPropertiesFrom(newGame);
    }
    
    
    [HttpPost("attempt/{id}")]
    public Guess MakeGuess(string id, [FromBody] MakeGuessDto makeGuess)
    {
        Guess newGuess = _GameService.AddGuess(id, makeGuess);
        return newGuess;
    }
}
