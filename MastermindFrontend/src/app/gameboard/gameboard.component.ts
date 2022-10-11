import {Component, Input, OnInit} from '@angular/core';
import {GameDto, GameService, Guess} from "../../openapi";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() game: GameDto = {id: '', user: '', maxGuesses: 0, guesses: []};
  colors: string[] = [];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.gameColorsGet().subscribe(x => this.colors = x);
    if(!this.hasWon(this.game.guesses![this.game.guesses!.length - 1]) && !this.hasLost(this.game.guesses![this.game.guesses!.length - 1])){
      this.game.guesses!.push({colors: ['','','',''], correctColorAndPosition: -1, correctColor: -1});
      console.log(this.game);
    }
  }

  submitAttempt() {
    this.gameService.gameAttemptIdPost(this.game.id!, this.game.guesses![this.game.guesses!.length - 1]).subscribe(x => {
      this.game.guesses![this.game.guesses!.length - 1] = x;
      if(!this.hasWon(x) && !this.hasLost(x)) {
        this.game.guesses!.push({colors: ['','','',''], correctColorAndPosition: -1, correctColor: -1});
        this.gameService.gameColorsGet().subscribe(x => this.colors = x);
      }
    });
  }

  allColorsSelected(colors: string[]) {
    return !(colors[0] == '' || colors[1] == '' || colors[2] == '' || colors[3] == '');
  }

  changeColor(number: number, color: string) {
    this.game.guesses![this.game.guesses!.length - 1].colors![number] = color;
    this.colors.splice(this.colors.indexOf(color), 1);
  }

  hasWon(guess: Guess) {
    return guess != null && guess.correctColorAndPosition == 4;

  }
  hasLost(guess: Guess) {
    return guess != null && this.game.guesses?.length == this.game.maxGuesses && guess.correctColorAndPosition != 4;
  }
}
