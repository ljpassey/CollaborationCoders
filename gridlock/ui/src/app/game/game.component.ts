import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Game } from '../../models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  currentPlayer!: 'X' | 'O' | '';
  boardSubscription!: Subscription;
  playerSubscription!: Subscription;
  modifiersSubscription!: Subscription;


  constructor(
    private gameService: GameService,
    private userService: UserService,

  ) {}

  ngOnInit(): void {
    // Subscribe to current player state
    this.playerSubscription = this.gameService.currentPlayer$.subscribe(
      (player) => {
        this.currentPlayer = player;
      }
    );
  }

  finish(): void {
    this.gameService.endTurn(this.currentPlayer);
  }

  hostGame(): void {
    const gameboard = JSON.stringify(Game.startingBoard);
    this.userService.hostGame(gameboard, this.currentPlayer);
  }
}
