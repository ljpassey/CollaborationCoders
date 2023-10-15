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
  chosenPiece!: Piece | null;
  chosenModifier!: Modifier | null;

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

  selectPieceToMove(
    row: number,
    col: number,
    currentPlayer: 'X' | 'O' | ''
  ): void {
    const selectedPiece = this.board[row][col];
    console.log(selectedPiece.position.row, selectedPiece.position.col);

    if (selectedPiece.player === currentPlayer) {
      // Select a piece
      // this.isPieceSelected = true;
      this.chosenPiece = selectedPiece;
      // TODO - select a modifier OR they can choose another piece to select
    }
  }

  selectDestination(
    row: number,
    col: number,
    currentPlayer: 'X' | 'O' | ''
  ): void {
    // TODO - ensure modifier is selected

    const selectedDestination = this.board[row][col];
    if (selectedDestination.player === currentPlayer) {
      // Not legal
      return;
    }

    if (!this.chosenPiece) {
      // Not legal
      return;
    }

    const isLegal = true; // is it in range AND
    if (isLegal) {
      this.gameService.movePiece(
        this.chosenPiece.position.row,
        this.chosenPiece.position.col,
        row,
        col
      );
      this.gameService.endTurn(this.currentPlayer);
      this.chosenPiece = null;
    }
  }

  getCellClass(i: number, j: number): string {
    const piece = this.board[i][j];
    const moveRow = piece.position.row;
    const moveCol = piece.position.col;

    if (piece) {
      if (piece === this.chosenPiece) {
        return 'selected';
      } else if (piece.player === this.currentPlayer && !this.chosenPiece) {
        // can't move the chosenPiece here, but you can change the chosenPiece to be this piece
        return 'selectable';
      } else if (this.chosenPiece) {
        if (
          (moveRow === this.chosenPiece.position.row - 1 &&
            moveCol === this.chosenPiece.position.col) ||
          (moveRow === this.chosenPiece.position.row + 1 &&
            moveCol === this.chosenPiece.position.col) ||
          (moveRow === this.chosenPiece.position.row &&
            moveCol === this.chosenPiece.position.col - 1) ||
          (moveRow === this.chosenPiece.position.row &&
            moveCol === this.chosenPiece.position.col + 1) ||
          (moveRow === this.chosenPiece.position.row - 1 &&
            moveCol === this.chosenPiece.position.col - 1) ||
          (moveRow === this.chosenPiece.position.row - 1 &&
            moveCol === this.chosenPiece.position.col + 1) ||
          (moveRow === this.chosenPiece.position.row + 1 &&
            moveCol === this.chosenPiece.position.col - 1) ||
          (moveRow === this.chosenPiece.position.row + 1 &&
            moveCol === this.chosenPiece.position.col + 1)
        ) {
          return 'selectable';
        } else {
          return '';
        }
      }
    }

    return '';
  }
}
