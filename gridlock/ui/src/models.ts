export type PlayerType = 'X' | 'O';
export type ModifierType = 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight';

export class Game {
  // Options selected during a turn
  selectedPiece: Piece | null = null;
  selectedModifier: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight' | null =
    null;
  selectedDestination: Piece | null = null;
  activePlayer: Player;
  passivePlayer: Player;
  board: Piece[][];
  possibleMoves: Position[] = [];
  xPieces: number = 6;
  oPieces: number = 6;
  startingBoard: Piece[][] = [
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
      new Piece('', new Position(3, 0)),
      new Piece('', new Position(3, 1)),
      new Piece('', new Position(3, 2)),
      new Piece('', new Position(3, 3)),
      new Piece('', new Position(3, 4)),
      new Piece('', new Position(3, 5)),
    ],
    [
      new Piece('', new Position(4, 0)),
      new Piece('', new Position(4, 1)),
      new Piece('', new Position(4, 2)),
      new Piece('', new Position(4, 3)),
      new Piece('', new Position(4, 4)),
      new Piece('', new Position(4, 5)),
    ],
    [
      new Piece('O', new Position(5, 0)),
      new Piece('O', new Position(5, 1)),
      new Piece('O', new Position(5, 2)),
      new Piece('O', new Position(5, 3)),
      new Piece('O', new Position(5, 4)),
      new Piece('O', new Position(5, 5)),
    ],
  ];

  constructor(startingPlayer: 'X' | 'O', modifiers: Modifier[]) {
    this.board = this.startingBoard;

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
    this.selectedPiece = null;
    this.selectedModifier = null;
    this.selectedDestination = null;
    this.possibleMoves = [];

    const isLegal = this.isPieceLegalToSelect(piece);
    if (!isLegal) {
      return false;
    }

    this.selectedPiece = piece;

    return true;
  }

  isPieceLegalToSelect(piece: Piece): boolean {
    const isCurrentPlayersPiece = piece.player == this.activePlayer.name;
    return isCurrentPlayersPiece;
  }

  selectModifier(
    type: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight'
  ): boolean {
    if (!this.selectedPiece) {
      return false;
    }

    this.selectedDestination = null;

    const isLegal = this.isModifierLegalToSelect(type);
    if (!isLegal) {
      return false;
    }

    this.selectedModifier = type;
    return true;
  }

  getPossibleMoves(
    row: number,
    col: number,
    type: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight'
  ): void {
    const positions: Position[] = [];

    switch (type) {
      case 'Pawn':
        positions.push(new Position(row + 1, col));
        positions.push(new Position(row, col + 1));
        positions.push(new Position(row, col - 1));
        positions.push(new Position(row - 1, col));
        positions.push(new Position(row + 1, col + 1));
        positions.push(new Position(row - 1, col + 1));
        positions.push(new Position(row + 1, col - 1));
        positions.push(new Position(row - 1, col - 1));
        break;
      case 'Rook':
        positions.push(new Position(row, col + 2));
        positions.push(new Position(row, col - 2));
        positions.push(new Position(row, col + 4));
        positions.push(new Position(row, col - 4));
        break;
      case 'Queen':
        positions.push(new Position(row + 2, col));
        positions.push(new Position(row - 2, col));
        positions.push(new Position(row + 4, col));
        positions.push(new Position(row - 4, col));
        break;
      case 'Bishop':
        positions.push(new Position(row + 2, col + 2));
        positions.push(new Position(row - 2, col + 2));
        positions.push(new Position(row + 2, col - 2));
        positions.push(new Position(row - 2, col - 2));
        positions.push(new Position(row + 4, col + 4));
        positions.push(new Position(row - 4, col + 4));
        positions.push(new Position(row + 4, col - 4));
        positions.push(new Position(row - 4, col - 4));
        break;
      case 'Knight':
        positions.push(new Position(row + 1, col + 2));
        positions.push(new Position(row - 1, col + 2));
        positions.push(new Position(row + 1, col - 2));
        positions.push(new Position(row - 1, col - 2));
        positions.push(new Position(row + 2, col + 1));
        positions.push(new Position(row - 2, col + 1));
        positions.push(new Position(row + 2, col - 1));
        positions.push(new Position(row - 2, col - 1));
        break;
      default:
        break;
    }

    this.possibleMoves = positions.filter((p) => {
      return (
        p.isInBounds() &&
        this.board[p.row][p.col].player != this.activePlayer.name
      );
    });
  }

  isModifierLegalToSelect(
    type: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight'
  ): boolean {
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

    const isLegal = this.isDestinationLegalToSelect(destination);
    if (!isLegal) {
      return false;
    }

    this.selectedDestination = destination;
    return true;
  }

  isDestinationLegalToSelect(destination: Piece): boolean {
    const isCurrentPlayersPiece = destination.player == this.activePlayer.name;
    const row = destination.position.row;
    const col = destination.position.col;

    let isInRange = false;
    this.possibleMoves.forEach((element) => {
      if (element.row == row && element.col == col) {
        isInRange = true;
      }
    });

    return !isCurrentPlayersPiece && isInRange;
  }

  endTurn(): boolean {
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

    if (this.selectedDestination.player == 'X') {
      this.xPieces--;
    }

    if (this.selectedDestination.player == 'O') {
      this.oPieces--;
    }

    console.log('xPieces :>> ', this.xPieces + ' oPieces :>> ' + this.oPieces);
    console.log(this.board);

    this.selectedPiece.player = '';
    this.selectedPiece = null;
    this.selectedDestination.player = this.activePlayer.name;

    const selectedModifier = this.selectedModifier;
    const playerModifier = this.activePlayer.modifiers.find(
      (m) => m.type == selectedModifier
    );
    if (!playerModifier || playerModifier.count == 0) {
      return false;
    } else {
      this.activePlayer.decrementPlayerModifierCount(
        selectedModifier,
        this.activePlayer
      );
      this.selectedModifier = null;
    }

    this.swapPlayers();

    this.possibleMoves = [];
    this.selectedDestination = null;

    this.checkEndGame();

    return true;
  }

  swapPlayers() {
    const temp = this.activePlayer;
    this.activePlayer = this.passivePlayer;
    this.passivePlayer = temp;
  }

  checkEndGame(): boolean {
    if (this.xPieces == 0) {
      alert('Congratulations!! O wins');
      this.resetGame();
      return true;
    } else if (this.oPieces == 0) {
      alert('Congratulations!! X wins');
      this.resetGame();
      return true;
    }

    return false;
  }

  resetGame() {
    this.board = this.startingBoard;

    const initialModifiers: Modifier[] = [
      new Modifier('Pawn', 3),
      new Modifier('Rook', 3),
      new Modifier('Queen', 3),
    ];

    if (this.activePlayer.name == 'X') {
      this.activePlayer = new Player('O', initialModifiers);
      this.passivePlayer = new Player('X', initialModifiers);
    } else {
      this.activePlayer = new Player('X', initialModifiers);
      this.passivePlayer = new Player('O', initialModifiers);
    }

    this.xPieces = 4;
    this.oPieces = 4;
  }
}

export class Piece {
  constructor(public player: 'X' | 'O' | '', public position: Position) {}
}

export class Player {
  name: 'X' | 'O';
  modifiers: Modifier[];
  modifierCount: [number, number, number, number, number] = [5, 5, 5, 5, 5];

  constructor(name: 'X' | 'O', modifiers: Modifier[]) {
    this.name = name;
    this.modifiers = modifiers;
    console.log(this.name + ' constructor modifiers :>> ', this.modifiers);
  }

  decrementPlayerModifierCount(
    type: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight',
    activePlayer: Player
  ): void {
    switch (type) {
      case 'Pawn':
        this.modifierCount[0]--;
        break;
      case 'Rook':
        this.modifierCount[1]--;
        break;
      case 'Queen':
        this.modifierCount[2]--;
        break;
      case 'Bishop':
        this.modifierCount[3]--;
        break;
      case 'Knight':
        this.modifierCount[4]--;
        break;
      default:
        break;
    }
    console.log('Modifier Count: ' + this.modifierCount);
  }
}

export class Position {
  constructor(public row: number, public col: number) {}

  isInBounds(): boolean {
    const rowInBounds = this.row >= 0 && this.row <= 5;
    const colInBounds = this.col >= 0 && this.col <= 5;
    return rowInBounds && colInBounds;
  }
}

export class Modifier {
  constructor(public type: ModifierType, public count: number) {}
}

export enum TurnStage {
  SELECT_PIECE,
  SELECT_MODIFIER,
  SELECT_DESTINATION,
  END_TURN,
}
