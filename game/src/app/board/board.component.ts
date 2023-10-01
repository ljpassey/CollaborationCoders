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
  board: Piece[][] = [
    [
      new Piece('X', new Position(0, 0)),
      new Piece('X', new Position(0, 1)),
      new Piece('X', new Position(0, 2)),
      new Piece('X', new Position(0, 3)),
    ],
    [
      new Piece('', new Position(1, 0)),
      new Piece('', new Position(1, 1)),
      new Piece('', new Position(1, 2)),
      new Piece('', new Position(1, 3)),
    ],
    [
      new Piece('', new Position(2, 0)),
      new Piece('', new Position(2, 1)),
      new Piece('', new Position(2, 2)),
      new Piece('', new Position(2, 3)),
    ],
    [
      new Piece('O', new Position(3, 0)),
      new Piece('O', new Position(3, 1)),
      new Piece('O', new Position(3, 2)),
      new Piece('O', new Position(3, 3)),
    ],
  ];
  currentPlayer!: 'X' | 'O' | '';
  modifiers!: Modifier[];
  chosenPiece!: Piece;
  isPieceSelected!: boolean;

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
    this.isPieceSelected = false;
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed
    this.boardSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.modifiersSubscription.unsubscribe();
  }

  selectTile(row: number, col: number, currentPlayer: 'X' | 'O' | ''): void {
    const selectedPiece = this.board[row][col];
    console.log(selectedPiece.position.row, selectedPiece.position.col);

    if (selectedPiece.player === currentPlayer && !this.isPieceSelected) {
      this.isPieceSelected = true;
      this.chosenPiece = selectedPiece;
      console.log(
        this.chosenPiece.position.row + 1,
        this.chosenPiece.position.col
      );
    } else if (this.isPieceSelected) {
      this.makeMove(row, col);
      this.isPieceSelected = false;
    }
  }

  getCellClass(i: number, j: number): string {
    const piece = this.board[i][j];
    const moveRow = piece.position.row + 1;
    const moveCol = piece.position.col;

    if (piece) {
      if (piece === this.chosenPiece) {
        return 'selected';
      } else if (piece.player === this.currentPlayer && !this.isPieceSelected) {
        return 'selectable';
      } else if (this.isPieceSelected) {
        if (
          moveRow === this.chosenPiece.position.row + 1 &&
          moveCol === this.chosenPiece.position.col - 1
        ) {
          return 'moveable';
        } else if (
          moveRow === this.chosenPiece.position.row + 1 &&
          moveCol === this.chosenPiece.position.col - 1
        ) {
          return 'selectable';
        } else if (
          moveRow === this.chosenPiece.position.row + 1 &&
          moveCol === this.chosenPiece.position.col + 1
        ) {
          return 'selectable';
        } else {
          return '';
        }
      }
    }

    return '';
  }

  selectDestination(row: number, col: number): void {
    this.gameService.selectDestination(row, col);
    console.log(this.chosenPiece);
    const destinationTile = this.board[row][col];
  }

  makeMove(row: number, col: number): void {
    this.gameService.movePiece(
      this.chosenPiece.position.row,
      this.chosenPiece.position.col,
      row,
      col
    );
    this.gameService.endTurn(this.currentPlayer);
  }
  // Rest of your component methods
  // ...
}
