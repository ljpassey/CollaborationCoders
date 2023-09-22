import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  currentPlayer!: string;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.currentPlayer = this.gameService.currentPlayer;
  }

  endTurn(): void {
    this.gameService.checkEndGame();
    this.currentPlayer = this.gameService.currentPlayer;
  }
}

