import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Piece, Modifier, Position, TurnStage, Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Add a BehaviorSubject to keep track of the current turn stage
  private turnStageSubject = new BehaviorSubject<TurnStage>(
    TurnStage.SELECT_PIECE
  );
  public turnStage$ = this.turnStageSubject.asObservable();

  // Add a BehaviorSubject to keep track of the selected piece
  private selectedPieceSubject = new BehaviorSubject<Piece | null>(null);
  public selectedPiece$ = this.selectedPieceSubject.asObservable();

  private gameSubject = new BehaviorSubject<string>('');
  // gameSubject.interval(100, () => { /api/gameID })

  private boardSubject = new BehaviorSubject<Piece[][]>([]);
  get board$() {
    return this.boardSubject.asObservable();
  }

  private currentPlayerSubject = new BehaviorSubject<'X' | 'O' | ''>('');
  public currentPlayer$ = this.currentPlayerSubject.asObservable();

  private modifiersSubject = new BehaviorSubject<Modifier[]>([]);
  public modifiers$ = this.modifiersSubject.asObservable();

  private selectedModifierSubject = new BehaviorSubject<Modifier | null>(null);
  public selectedModifier$ = this.modifiersSubject.asObservable();

  constructor() {
    this.initGame();
  }

  update(json: string) {
    // TODO - eventually make an API call to store the game update in a DB
  }

  // REVISIT BELOW HERE ------

  initGame() {
    const initialBoard: Piece[][] = [
      [
        new Piece('X', new Position(0, 0)),
        new Piece('X', new Position(0, 1)),
        new Piece('X', new Position(0, 2)),
        new Piece('X', new Position(0, 3)),
        new Piece('X', new Position(0, 4)),
        new Piece('X', new Position(0, 5)),
      ],
      [
        new Piece('', new Position(1, 0)),
        new Piece('', new Position(1, 1)),
        new Piece('', new Position(1, 2)),
        new Piece('', new Position(1, 3)),
        new Piece('', new Position(1, 4)),
        new Piece('', new Position(1, 5)),
      ],
      [
        new Piece('', new Position(2, 0)),
        new Piece('', new Position(2, 1)),
        new Piece('', new Position(2, 2)),
        new Piece('', new Position(2, 3)),
        new Piece('', new Position(2, 4)),
        new Piece('', new Position(2, 5)),
      ],
      [
        new Piece('O', new Position(3, 0)),
        new Piece('O', new Position(3, 1)),
        new Piece('O', new Position(3, 2)),
        new Piece('O', new Position(3, 3)),
        new Piece('O', new Position(3, 4)),
        new Piece('O', new Position(3, 5)),
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

  /**
   * Updates the game board with a new configuration.
   * @param newBoard The new configuration of the game board.
   */
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

  // Method to set the selected piece
  setSelectedPiece(piece: Piece): void {
    this.selectedPieceSubject.next(piece);
  }

  setSelectedModifier(modifier: Modifier): void {
    this.selectedModifierSubject.next(modifier);
  }

  // Method to set the current turn stage
  setTurnStage(stage: TurnStage): void {
    this.turnStageSubject.next(stage);
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
    const newModifiers = JSON.parse(
      JSON.stringify(this.modifiersSubject.value)
    );

    if (modifier.count > 0) {
      modifier.count--;
      this.updateModifiers(newModifiers);
    }
  }

  endTurn(currentPlayer: any): void {
    // this.currentPlayerSubject.next(currentPlayer === 'X' ? 'O' : 'X');
    this.updateBoard(this.boardSubject.value);
  }
}
