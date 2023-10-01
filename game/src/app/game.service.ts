import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Piece, Modifier, Position } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Use BehaviorSubjects for reactive state management
  private boardSubject = new BehaviorSubject<Piece[][]>([]);
  public board$ = this.boardSubject.asObservable();

  private currentPlayerSubject = new BehaviorSubject<'X' | 'O' | ''>('');
  public currentPlayer$ = this.currentPlayerSubject.asObservable();

  private modifiersSubject = new BehaviorSubject<Modifier[]>([]);
  public modifiers$ = this.modifiersSubject.asObservable();

  constructor() {
    this.initGame();
  }

  initGame() {
    // Initialize the board as a 4x4 grid
    const initialBoard: Piece[][] = [[], [], [], []];

    // Populate the board with Player 'X' and Player 'O' pieces
    for (let i = 0; i < 4; i++) {
      initialBoard[0][i] = new Piece('X', new Position(0, i));
      initialBoard[1][i] = new Piece('', new Position(1, i));
      initialBoard[2][i] = new Piece('', new Position(2, i));
      initialBoard[3][i] = new Piece('O', new Position(3, i));
    }

    // Use the updateBoard method to set the initial state
    this.updateBoard(initialBoard);

    // Set the initial current player
    this.updatePlayer(this.decideStartingPlayer());

    const initialModifiers: Modifier[] = [
      new Modifier('Pawn', 3),
      new Modifier('Rook', 2),
      new Modifier('Queen', 1),
    ];

    this.updateModifiers(initialModifiers);
  }

  // Methods to update states immutably
  updateBoard(newBoard: Piece[][]): void {
    this.boardSubject.next([...newBoard]);
    console.log(newBoard);
  }

  updatePlayer(newPlayer: any): void {
    this.currentPlayerSubject.next(newPlayer);
    this.currentPlayer$.subscribe((player) => {
      console.log(player);
    });
  }

  updateModifiers(newModifiers: Modifier[]): void {
    this.modifiersSubject.next([...newModifiers]);
  }

  // Your existing methods can remain but should use the update methods to change state

  decideStartingPlayer(): string {
    // Roll dice to decide the starting player
    let diceRoll1 = this.rollDice();
    let diceRoll2 = this.rollDice();
    return diceRoll1 >= diceRoll2 ? 'X' : 'O';
  }

  rollDice(): number {
    // Implement dice-rolling logic
    const returnValue = Math.floor(Math.random() * 6) + 1;
    console.log(returnValue);
    return returnValue;
  }

  selectPiece(piece: Piece): void {
    this.currentPlayerSubject.next(piece.player);
    this.currentPlayer$.subscribe((player) => {
      console.log(player);
    });

    console.log(piece.player, piece.position.row, piece.position.col)
    if (piece.player === '') {
      console.log('Selected piece:', piece);
      console.log('Current player:', piece.player);
    } else {
      console.log('Piece already selected');
    }
  }

  movePiece(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): void {
    // Clone the current board state to create a new board
    const newBoard = JSON.parse(JSON.stringify(this.boardSubject.value));

    // Get the piece from the 'from' cell
    const movingPiece = newBoard[fromRow][fromCol];

    // Check if the move is valid (for simplicity, just checking vertical move by 1 tile)
    if (movingPiece && Math.abs(toRow - fromRow) === 1 && toCol === fromCol) {
      // Move the piece
      newBoard[toRow][toCol] = movingPiece;
      newBoard[fromRow][fromCol] = null;

      // Update the board state
      this.updateBoard(newBoard);
    }
  }

  useModifier(modifier: Modifier): void {
    // Logic to use a modifier
  }

  endTurn(currentPlayer: any): void {
     this.currentPlayerSubject.next(currentPlayer === 'X' ? 'O' : 'X');
  }
}
