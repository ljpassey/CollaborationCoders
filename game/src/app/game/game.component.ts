import { Observable, Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { Component } from '@angular/core';
import { Piece, Position, Modifier } from '../../models';

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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    let player = this.gameService.currentPlayer$;
    console.log(player);

    // Subscribe to current player state
    this.playerSubscription = this.gameService.currentPlayer$.subscribe(
      (player) => {
        this.currentPlayer = player;
      }
    );
  }

  updateBoard(): void {
    // Update the board state
  }

  updateCurrentPlayer() {
    // Logic to check the game board and update currentPlayer to the next player in the game
    // For example, you might check the number of X's and O's on the board to determine which player has the next turn
    // You can then update currentPlayer to reflect the next player's turn
  }

  finish(): void {
    this.gameService.endTurn(this.currentPlayer);
  }
}
