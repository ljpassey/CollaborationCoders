import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Piece, Modifier, Position } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private boardSubject = new BehaviorSubject<Piece[][]>([]);
  get board$() {
    return this.boardSubject.asObservable();
  }

  private currentPlayerSubject = new BehaviorSubject<'X' | 'O' | ''>('');
  public currentPlayer$ = this.currentPlayerSubject.asObservable();

  private modifiersSubject = new BehaviorSubject<Modifier[]>([]);
  public modifiers$ = this.modifiersSubject.asObservable();

  constructor() {
    this.initGame();
  }

  initGame() {
    const initialBoard: Piece[][] = [
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

    this.updateBoard(initialBoard);
    this.updatePlayer(this.decideStartingPlayer());

    const initialModifiers: Modifier[] = [
      new Modifier('Pawn', 3),
      new Modifier('Rook', 0),
      new Modifier('Queen', 0),
    ];

    this.updateModifiers(initialModifiers);
  }

  updateBoard(newBoard: Piece[][]): void {
    this.boardSubject.next(newBoard);
  }

  updatePlayer(newPlayer: any): void {
    this.currentPlayerSubject.next(newPlayer);
  }

  updateModifiers(newModifiers: Modifier[]): void {
    this.modifiersSubject.next([...newModifiers]);
  }

  decideStartingPlayer(): string {
    let diceRoll1 = this.rollDice();
    let diceRoll2 = this.rollDice();
    return diceRoll1 >= diceRoll2 ? 'X' : 'O';
  }

  rollDice(): number {
    const returnValue = Math.floor(Math.random() * 6) + 1;
    return returnValue;
  }

  selectPiece(piece: Piece): void {
    this.currentPlayerSubject.next(piece.player);

    if (piece.player === '') {
      console.log('Selected piece:', piece);
      console.log('Current player:', piece.player);
    } else {
      console.log('Piece already selected');
    }
  }

  selectDestination(row: number, col: number): void {
    console.log('Selected destination:', row, col);
  }

  movePiece(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): void {
    const newBoard = JSON.parse(JSON.stringify(this.boardSubject.value));
    const movingPiece = newBoard[fromRow][fromCol];

    if (
      movingPiece &&
      Math.abs(toRow - fromRow) <= 1 &&
      Math.abs(toCol - fromCol) <= 1
    ) {
      const destinationPiece = newBoard[toRow][toCol];
      if (!destinationPiece || destinationPiece.player !== movingPiece.player) {
        newBoard[fromRow][fromCol] = new Piece(
          '',
          new Position(fromRow, fromCol)
        );
        newBoard[toRow][toCol] = new Piece(
          movingPiece.player,
          new Position(toRow, toCol)
        );

        this.updateBoard(newBoard);
      }
    }
  }
  useModifier(modifier: Modifier): void {
    const newModifiers = JSON.parse(JSON.stringify(this.modifiersSubject.value));

    if (modifier.count > 0) {
      modifier.count--;
      this.updateModifiers(newModifiers);
    }


  }

  endTurn(currentPlayer: any): void {
    this.currentPlayerSubject.next(currentPlayer === 'X' ? 'O' : 'X');
    this.updateBoard(this.boardSubject.value);
  }
}
