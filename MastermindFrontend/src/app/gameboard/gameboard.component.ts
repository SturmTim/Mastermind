import {Component, Input, OnInit} from '@angular/core';
import {GameService, MakeGuessDto, MakeGuessResponse} from "../../openapi";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() gameId = '';
  @Input() user = '';
  @Input() maxAttempts = 11;

  colors: string[] = [];
  guesses: MakeGuessDto[] = [{colors: ['','','','']}];
  guessResponses: MakeGuessResponse[] = [];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.gameColorsGet().subscribe(x => this.colors = x);
  }

  submitAttempt() {
    this.gameService.gameAttemptIdPut(this.gameId, this.guesses[this.guesses.length - 1]).subscribe(x => {
      this.guessResponses.push(x);
      if(!this.hasWon(this.guessResponses) && !this.hasLost(this.guessResponses)) {
        this.guesses.push({colors: ['','','','']});
        this.gameService.gameColorsGet().subscribe(x => this.colors = x);
      }
    });
  }

  allColorsSelected(colors: string[]) {
    return !(colors[0] == '' || colors[1] == '' || colors[2] == '' || colors[3] == '');
  }

  changeColor(number: number, color: string) {
    this.guesses[this.guesses.length - 1].colors![number] = color;
    this.colors.splice(this.colors.indexOf(color), 1);
  }

  hasWon(makeGuessResponses: MakeGuessResponse[]) {
    return makeGuessResponses[makeGuessResponses.length - 1] != null && makeGuessResponses[makeGuessResponses.length - 1]!.correctColorAndPosition == 4;

  }
  hasLost(makeGuessResponses: MakeGuessResponse[]) {
    return makeGuessResponses.length == this.maxAttempts && makeGuessResponses[makeGuessResponses.length - 1]!.correctColorAndPosition != 4;

  }
}
