import { Component } from '@angular/core';
import {GameService} from "../openapi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';
  maxGuesses = 6;
  inGame = false;

  gameId = '';

  constructor(
    private gameService: GameService
  ) { }

  startNewGame() {
    this.gameService.gamePut({user: this.name, maxGuesses: this.maxGuesses}).subscribe(x => {
      this.gameId = x.id!;
      this.name = x.user!;
      this.inGame = true;
    });
  }
}
