export class Game {
  // Options selected during a turn
  selectedPiece: Piece | null = null;
  selectedModifier: Modifier | null = null;
  selectedDestination: Piece | null = null;

  currentPlayer!: Player;
  players!: Player[];

  stage: TurnStage = TurnStage.SELECT_PIECE;
  board!: Piece[][];

  // g.selectPiece()

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

  isPieceLegalToSelect(piece: Piece | null): boolean {
    if (!piece) {
      return false;
    }

    const isCurrentPlayersPiece = piece.player == this.currentPlayer.name;
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

  isModifierLegalToSelect(modifier: Modifier | null): boolean {
    if (!modifier) {
      return false;
    }

    const playerModifier = this.currentPlayer.modifiers.find(
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

  isDestinationLegalToSelect(destination: Piece | null): boolean {
    if (!destination) {
      return false;
    }

    const isCurrentPlayersPiece = destination.player == this.currentPlayer.name;
    const isInRange = true; // TODO - uses this.selectedModifier

    return !isCurrentPlayersPiece && isInRange;;
  }

  endTurn(): boolean {
    // Verify legality of turn (one last time)
    if (!this.isPieceLegalToSelect(this.selectedPiece)) {
      return false;
    }
    if (!this.isModifierLegalToSelect(this.selectedModifier)) {
      return false;
    }
    if (!this.isDestinationLegalToSelect(this.selectedDestination)) {
      return false;
    }

    // TODO - Empty out the place where a piece was moved from
    // TODO - Update the destination where a piece was moved to
    // TODO - Decrement player modifiers that were used
    // TODO - Flipping the current player owndership to the opponent

    return true;
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
  name: 'X' | 'O' = 'X';
  modifiers: Modifier[] = [];
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
