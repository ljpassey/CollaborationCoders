export class Game {
  // Options selected during a turn
  selectedPiece: Piece | null = null;
  selectedModifier: 'Pawn' | 'Rook' | 'Queen' | null = null;
  selectedDestination: Piece | null = null;
  activePlayer: Player;
  passivePlayer: Player;
  board: Piece[][];
  possibleMoves: Position[] = [];

  constructor(startingPlayer: 'X' | 'O', modifiers: Modifier[]) {
    this.board = [
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

    if (startingPlayer == 'X') {
      this.activePlayer = new Player('X', modifiers);
      this.passivePlayer = new Player('O', modifiers);
    } else {
      this.activePlayer = new Player('O', modifiers);
      this.passivePlayer = new Player('X', modifiers);
    }
  }

  getStage():
    | 'SELECT_PIECE'
    | 'SELECT_MODIFIER'
    | 'SELECT_DESTINATION'
    | 'END_TURN' {
    if (!this.selectedPiece) {
      return 'SELECT_PIECE';
    }

    if (!this.selectedModifier) {
      return 'SELECT_MODIFIER';
    }

    if (!this.selectedDestination) {
      return 'SELECT_DESTINATION';
    }

    return 'END_TURN';
  }

  selectPiece(piece: Piece): boolean {
    // Stage setup
    this.selectedModifier = null;
    this.selectedDestination = null;

    // Legality checks
    const isLegal = this.isPieceLegalToSelect(piece);
    if (!isLegal) {
      return false;
    }

    // State changes
    this.selectedPiece = piece;

    return true;
  }

  isPieceLegalToSelect(piece: Piece): boolean {
    const isCurrentPlayersPiece = piece.player == this.activePlayer.name;
    return isCurrentPlayersPiece;
  }

  selectModifier(type: 'Pawn' | 'Rook' | 'Queen'): boolean {
    if (!this.selectedPiece) {
      return false;
    }

    // Stage setup
    this.selectedDestination = null;

    const isLegal = this.isModifierLegalToSelect(type);
    if (!isLegal) {
      return false;
    }

    // State changes
    this.selectedModifier = type;
    return true;
  }

  getPossibleMoves(
    row: number | undefined,
    col: number | undefined,
    type: 'Pawn' | 'Rook' | 'Queen'
  ): void {
    const possibleMoves: Position[] = [];
    console.log('getPossibleMoves :>> ', row, col, type);

    // Determine the range of the selected modifier
    let range: number;
    switch (type) {
      case 'Pawn':
        range = 1;
        break;
      case 'Rook':
        range = 2;
        break;
      case 'Queen':
        range = 3;
        break;
      default:
        range = 0;
        break;
    }

    // Determine the possible moves
    const x = row;
    const y = col;
    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const newX = x !== undefined ? x + i : undefined;
        const newY = y !== undefined ? y + j : undefined;
        if (
          newX === undefined ||
          newX < 0 ||
          newX >= this.board.length ||
          newY === undefined ||
          newY < 0 ||
          newY >= this.board[0].length
        ) {
          continue;
        }
        const piece = this.board[newX][newY];
        if (!piece || piece.player !== this.activePlayer.name) {
          possibleMoves.push(new Position(newX, newY));
        }
      }
    }

    this.possibleMoves = possibleMoves;
    console.log(possibleMoves);
  }

  isModifierLegalToSelect(type: 'Pawn' | 'Rook' | 'Queen'): boolean {
    const playerModifier = this.activePlayer.modifiers.find(
      (m) => m.type == type
    );
    if (!playerModifier || playerModifier.count === 0) {
      return false;
    }

    return true;
  }

  selectDestination(destination: Piece): boolean {
    if (!this.selectedPiece || !this.selectedModifier) {
      return false;
    }

    // Legality checks
    const isLegal = this.isDestinationLegalToSelect(destination);
    if (!isLegal) {
      return false;
    }

    // State changes
    this.selectedDestination = destination;
    return true;
  }

  isDestinationLegalToSelect(destination: Piece): boolean {
    const isCurrentPlayersPiece = destination.player == this.activePlayer.name;
    // TODO - use `this.selectedPiece` and `this.selectedModifier` to determine if destination is in range
    const isInRange = true;

    return !isCurrentPlayersPiece && isInRange;
  }

  endTurn(): boolean {
    // Verify legality of turn (one last time)
    if (
      !this.selectedPiece ||
      !this.selectedModifier ||
      !this.selectedDestination
    ) {
      return false;
    }
    if (!this.isPieceLegalToSelect(this.selectedPiece)) {
      return false;
    }
    if (!this.isModifierLegalToSelect(this.selectedModifier)) {
      return false;
    }
    if (!this.isDestinationLegalToSelect(this.selectedDestination)) {
      return false;
    }

    // Empty out the place where a piece was moved from
    this.selectedPiece.player = '';
    this.selectedPiece = null;

    // Update the destination where a piece was moved to
    this.selectedDestination.player = this.activePlayer.name;

    // Decrement player modifiers that were used
    const selectedModifier = this.selectedModifier;
    const playerModifier = this.activePlayer.modifiers.find(
      (m) => m.type == selectedModifier
    );
    if (!playerModifier || playerModifier.count == 0) {
      return false;
    }

    // Flipping the current player owndership to the opponent
    this.swapPlayers();

    return true;
  }

  swapPlayers() {
    const temp = this.activePlayer;
    this.activePlayer = this.passivePlayer;
    this.passivePlayer = temp;
    console.log('Swapped players' + this.activePlayer.name)
  }
}

export class Piece {
  constructor(
    public player: 'X' | 'O' | '',
    public position: Position,
    public isSelected: boolean = false
  ) {}
}

export class Player {
  name: 'X' | 'O';
  modifiers: Modifier[];

  constructor(name: 'X' | 'O', modifiers: Modifier[]) {
    this.name = name;
    this.modifiers = modifiers;
  }
}
export class Position {
  constructor(public row: number, public col: number) {}
}

export class Modifier {
  constructor(public type: 'Pawn' | 'Rook' | 'Queen', public count: number) {}
}

export enum TurnStage {
  SELECT_PIECE,
  SELECT_MODIFIER,
  SELECT_DESTINATION,
  END_TURN,
}
