import { Component } from '@angular/core';
import {GameDto, GameService} from "../openapi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';
  maxGuesses = 6;
  gameId = '';
  inGame = false;

  game: GameDto = {id: '', user: '', maxGuesses: 0, guesses: []};

  constructor(
    private gameService: GameService
  ) { }

  startNewGame() {
    this.gameService.gamePost({user: this.name, maxGuesses: this.maxGuesses}).subscribe(x => {
      this.game = x;
      this.inGame = true;
    });
  }

  continueGame() {
    console.log(this.gameId);
    this.gameService.gameIdGet(this.gameId).subscribe(x => {
      this.game = x;
      this.inGame = true;
    });
  }
}
