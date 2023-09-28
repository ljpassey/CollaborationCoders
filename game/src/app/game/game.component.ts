import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  currentPlayer!: string;
  nextStep!: any;
  endTurn: any;
  constructor(private gameService: GameService) {
    this.currentPlayer = this.gameService.currentPlayer;
    this.nextStep = this.gameService.steps[0].step;
  }
  finish(): void {
    this.endTurn = this.gameService.endTurn();
  }
}
