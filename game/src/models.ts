export class Game {
  // Options selected during a turn
  selectedPiece: Piece | null = null;
  selectedModifier: Modifier | null = null;
  selectedDestination: Piece | null = null;

  currentPlayer!: Player;
  players!: Player[];

  stage: TurnStage = TurnStage.SELECT_PIECE;
  board!: Piece[][];

  selectPiece(p: Piece): boolean {
    // Legality checks
    if (this.stage != TurnStage.SELECT_PIECE) {
      return false;
    }

    this.selectedPiece = p;
    return true;
  }

  selectModifier(modifierToSelect: Modifier): boolean {
    const playersModifier = this.currentPlayer.modifiers.find(
      (m) => m.type == modifierToSelect.type
    );
    if (playersModifier?.count == 0) {
      return false;
    }

    // Legality checks
    if (this.stage != TurnStage.SELECT_MODIFIER) {
      return false;
    }

    this.selectedModifier = modifierToSelect;

    return true;
  }

  selectDestination(destination: Piece): boolean {
    // Legality checks
    if (this.stage != TurnStage.SELECT_DESTINATION) {
      return false;
    }

    this.selectedDestination = destination;
    return true;
  }

  endTurn() {
    // Empty out the place where a piece was moved from
    // Update the destination where a piece was moved to
    // Decrement player modifiers that were used
    // Flipping the current player owndership to the opponent
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
  name: 'X' | 'O' = 'X';
  modifiers: Modifier[] = [];
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
