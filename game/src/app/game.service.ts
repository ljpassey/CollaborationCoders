import { Injectable } from '@angular/core';
import { Piece, Modifier, Position } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Initialize variables
  currentPlayer: 'Player 1' | 'Player 2';
  board!: Piece[][];
  modifiers!: Modifier[];

  constructor() {
    this.currentPlayer = this.decideStartingPlayer();
    this.initGame();
  }

  initGame() {
    // Initialize the board as a 4x4 grid filled with null
    this.board = Array.from({ length: 4 }, () => Array(4).fill(null));

    // Populate the board with Player1 and Player2 pieces
    for (let i = 0; i < 4; i++) {
      this.board[0][i] = new Piece('Player 1', new Position(0, i), 4);
      this.board[3][i] = new Piece('Player 2', new Position(3, i), 4);
    }

    // Initialize modifiers for each player
    this.modifiers = [
      new Modifier('Pawn', 5),
      new Modifier('Rook', 3),
      new Modifier('Queen', 3),
    ];
  }

  decideStartingPlayer(): 'Player 1' | 'Player 2' {
    // Roll dice to decide the starting player
    const diceRoll1 = this.rollDice();
    const diceRoll2 = this.rollDice();
    return diceRoll1 >= diceRoll2 ? 'Player 1' : 'Player 2';
  }

  rollDice(): number {
    // Implement dice-rolling logic
    const returnValue = Math.floor(Math.random() * 6) + 1;
    console.log(returnValue);
    return returnValue;
  }

  selectPiece(piece: Piece): void {
    // Logic to select a piece
  }

  useModifier(modifier: Modifier): void {
    // Find the matching modifier from the player's supply
    const playerModifier = this.modifiers.find((m) => m.type === modifier.type);

    if (playerModifier && playerModifier.count > 0) {
      // Consume the modifier
      playerModifier.count--;

      // Apply the modifier's effects to determine valid moves
      // This can be implemented in various ways depending on how you're managing game state
    } else {
      // Invalid modifier or out of stock
    }
  }

  makeMove(start: Position, end: Position): void {
    // Move a piece and handle piece elimination or revival
    const piece = this.board[start.row][start.col];
    this.board[end.row][end.col] = piece;
    // this.board[start.row][start.col] = ;
    const eliminatedPiece = this.board[end.row][end.col];
    if (eliminatedPiece && eliminatedPiece.player !== this.currentPlayer) {
      const diceRoll = this.rollDice();
      if (diceRoll > /* Number of remaining pieces */ 4) {
        // Remove the eliminated piece
        this.board[end.row][end.col] = piece;
      } else {
        // Move back to the start position, as the attack was thwarted
        this.board[start.row][start.col] = piece;
        this.board[end.row][end.col] = eliminatedPiece;
      }
    }
  }

  isValidMove(start: Position, end: Position, modifiers: Modifier[]): boolean {
    // Check if the start and end positions are the same
    if (start.row === end.row && start.col === end.col) {
      return false;
    }

    // Retrieve the piece at the start position
    const piece = this.board[start.row][start.col];

    // Check if the piece belongs to the current player
    if (piece && piece.player !== this.currentPlayer) {
      return false;
    }

    // Calculate the distance moved in each direction
    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);

    // Validate the move based on the modifiers used
    for (const modifier of modifiers) {
      switch (modifier.type) {
        case 'Pawn':
          if (
            (rowDiff === 1 && colDiff === 0) ||
            (rowDiff === 0 && colDiff === 1)
          ) {
            return true;
          }
          break;
        case 'Rook':
          if (rowDiff === 0 && colDiff === 2) {
            return true;
          }
          break;
        case 'Queen':
          if (rowDiff === 2 && colDiff === 0) {
            return true;
          }
          break;
        default:
          return false;
      }
    }

    return false;
  }

  alternatePlayer(): void {
    // Alternate the current player
    this.currentPlayer =
      this.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
  } 

  checkEndGame(): any {
    // Check if all pieces of one player are eliminated
    const player1Pieces = this.board.reduce(
      (sum, row) =>
        sum +
        row.reduce(
          (rowSum, piece) =>
            rowSum + (piece?.player === 'Player 1' ? piece.count : 0),
          0
        ),
      0
    );

    const player2Pieces = this.board.reduce(
      (sum, row) =>
        sum +
        row.reduce(
          (rowSum, piece) =>
            rowSum + (piece?.player === 'Player 2' ? piece.count : 0),
          0
        ),
      0
    );
    
    let gameOver = false;
    let result = console.log(gameOver);

    if (player1Pieces === 0 || player2Pieces === 0) {
      gameOver = true;
      return gameOver;
    }

    // Check if all modifiers are used up
    const totalModifiers = this.modifiers.reduce((sum, m) => sum + m.count, 0);

    if (totalModifiers === 0 && player1Pieces === player2Pieces) {
      // Game ends in a draw
      return true;
    } else if (totalModifiers === 0) {
      // Player with more pieces wins
      return true;
    }

    return console.log(result);
  }
}
