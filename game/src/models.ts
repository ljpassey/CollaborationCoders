export class Game {
  // Options selected during a turn
  selectedPiece: Piece | null = null;
  selectedModifier: Modifier | null = null;
  selectedDestination: Piece | null = null;

  activePlayer: Player;
  passivePlayer: Player;

  stage: TurnStage = TurnStage.SELECT_PIECE;
  board: Piece[][];

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


  selectPiece(piece: Piece): boolean {
    // Stage setup
    this.selectedModifier = null;
    this.selectedDestination = null;
    this.stage = TurnStage.SELECT_PIECE;

    // Legality checks
    const isLegal = this.isPieceLegalToSelect(piece);
    if (!isLegal) {
      return false;
    }

    // State changes
    this.selectedPiece = piece;
    this.stage++;

    return true;
  }

  isPieceLegalToSelect(piece: Piece): boolean {
    const isCurrentPlayersPiece = piece.player == this.activePlayer.name;
    return isCurrentPlayersPiece;
  }

  selectModifier(modifier: Modifier): boolean {
    // Stage setup
    this.selectedDestination = null;
    this.stage = TurnStage.SELECT_MODIFIER;

    const isLegal = this.isModifierLegalToSelect(modifier);
    if (!isLegal) {
      return false;
    }

    // State changes
    this.selectedModifier = modifier;
    this.stage++;

    return true;
  }

  isModifierLegalToSelect(modifier: Modifier): boolean {
    const playerModifier = this.activePlayer.modifiers.find(
      (m) => m.type == modifier.type
    );
    if (!playerModifier || playerModifier.count == 0) {
      return false;
    }

    return true;
  }

  selectDestination(destination: Piece): boolean {
    // Stage setup
    this.stage = TurnStage.SELECT_DESTINATION;

    // Legality checks
    const isLegal = this.isDestinationLegalToSelect(destination);
    if (!isLegal) {
      return false;
    }

    // State changes
    this.selectedDestination = destination;
    this.stage++;

    return true;
  }

  isDestinationLegalToSelect(destination: Piece): boolean {
    const isCurrentPlayersPiece = destination.player == this.activePlayer.name;
    // TODO - use `this.selectedPiece` and `this.selectedModifier` to determine if destination is in range
    const isInRange = true;

    return !isCurrentPlayersPiece && isInRange;;
  }

  endTurn(): boolean {
    // Verify legality of turn (one last time)
    if (!this.selectedPiece || !this.selectedModifier || !this.selectedDestination) {
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

    // Update the destination where a piece was moved to
    this.selectedDestination.player = this.activePlayer.name;

    // Decrement player modifiers that were used
    const selectedModifier = this.selectedModifier;
    const playerModifier = this.activePlayer.modifiers.find(
      (m) => m.type == selectedModifier.type
    );
    if (!playerModifier || playerModifier.count == 0) {
      return false;
    }

    // Flipping the current player owndership to the opponent
    this.swapPlayers()

    return true;
  }

  swapPlayers() {
    const temp = this.activePlayer;
    this.activePlayer = this.passivePlayer;
    this.passivePlayer = temp;
  }
}

export class Piece {
  constructor(
    public player: 'X' | 'O' | '',
    public position: Position,
    public isSelected: boolean = false
  ) { }
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
  constructor(public row: number, public col: number) { }
}

export class Modifier {
  constructor(public type: 'Pawn' | 'Rook' | 'Queen', public count: number) { }
}

export enum TurnStage {
  SELECT_PIECE,
  SELECT_MODIFIER,
  SELECT_DESTINATION,
  END_TURN,
}
