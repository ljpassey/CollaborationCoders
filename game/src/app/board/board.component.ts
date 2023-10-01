import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { Piece, Position, Modifier } from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  board!: Piece[][];
  currentPlayer!: 'X' | 'O' | '';
  modifiers!: Modifier[];
  chosenPiece!: Piece;
  boardSubscription!: Subscription;
  playerSubscription!: Subscription;
  modifiersSubscription!: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // Subscribe to board state
    this.boardSubscription = this.gameService.board$.subscribe((newBoard) => {
      this.board = newBoard;
    });

    // Subscribe to current player state
    this.playerSubscription = this.gameService.currentPlayer$.subscribe(
      (player) => {
        this.currentPlayer = player;
      }
    );

    // Subscribe to modifiers state
    this.modifiersSubscription = this.gameService.modifiers$.subscribe(
      (newModifiers) => {
        this.modifiers = newModifiers;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed
    this.boardSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.modifiersSubscription.unsubscribe();
  }

  selectTile(row: number, col: number, currentPlayer: 'X' | 'O' | ''): void {
    this.chosenPiece = this.board[row][col];
    this.currentPlayer = currentPlayer;

    if (this.chosenPiece.player === currentPlayer) {
      this.gameService.selectPiece(this.chosenPiece);
      console.log(this.chosenPiece);
    } else {
      alert('Please select a tile with your piece');
    }
  }

  // Rest of your component methods
  // ...
}
