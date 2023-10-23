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
  xPieces: number = 5;
  oPieces: number = 5;

  constructor(startingPlayer: 'X' | 'O', modifiers: Modifier[]) {
    this.board = [
      [
        new Piece('X', new Position(0, 0)),
        new Piece('X', new Position(0, 1)),
        new Piece('X', new Position(0, 2)),
        new Piece('X', new Position(0, 3)),
        new Piece('X', new Position(0, 4)),
        // new Piece('X', new Position(0, 5)),
      ],
      [
        new Piece('', new Position(1, 0)),
        new Piece('', new Position(1, 1)),
        new Piece('', new Position(1, 2)),
        new Piece('', new Position(1, 3)),
        new Piece('', new Position(1, 4)),
        // new Piece('', new Position(1, 5)),
      ],
      [
        new Piece('', new Position(2, 0)),
        new Piece('', new Position(2, 1)),
        new Piece('', new Position(2, 2)),
        new Piece('', new Position(2, 3)),
        new Piece('', new Position(2, 4)),
        // new Piece('', new Position(2, 5)),
      ],
      [
        new Piece('', new Position(3, 0)),
        new Piece('', new Position(3, 1)),
        new Piece('', new Position(3, 2)),
        new Piece('', new Position(3, 3)),
        new Piece('', new Position(3, 4)),
        // new Piece('', new Position(3, 5)),
      ],

      [
        new Piece('O', new Position(4, 0)),
        new Piece('O', new Position(4, 1)),
        new Piece('O', new Position(4, 2)),
        new Piece('O', new Position(4, 3)),
        new Piece('O', new Position(4, 4)),
        // new Piece('O', new Position(4, 5)),
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

  // In order to add the ability for a player to select a piece, first modifier, first destination, then select a second modifier, and then select a second destination, we need to keep track of the current stage of the turn. This method will return the current stage of the turn.
  // But, what if we wanted to add the ability to select up to two modifiers, but not require it?
  //Maybe at the player has selected their destination, we could give them the option to move further by selecting an additional modifier, then an additional destination based on the new possible moves.
  // If we did that, then we could probably set the stage back to SELECT_MODIFIER, and then SELECT_DESTINATION, and then END_TURN. We would need to update the tracked state of the selected modifier and destination, and the possible moves.
  // We could also add a new stage to the turn, like SELECT_SECOND_MODIFIER, and then SELECT_SECOND_DESTINATION, and then END_TURN.
  // If a player only wants to use one modifier, then they can choose to end their turn after selecting a modifier and destination and the second turn stage will be skipped.
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

  /**
   * Selects a piece on the game board and updates the game state accordingly.
   * @param piece The piece to be selected.
   * @returns A boolean indicating whether the piece selection was successful.
   */
  selectPiece(piece: Piece): boolean {
    // Stage setup
    this.selectedPiece = null;
    this.selectedModifier = null;
    this.selectedDestination = null;
    this.possibleMoves = [];

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

  selectModifier(
    type: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight'
  ): boolean {
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

  /**
   * Calculates and sets the possible moves for a given piece on the board.
   * @param row - The row index of the piece.
   * @param col - The column index of the piece.
   * @param type - The type of the piece ('Pawn', 'Rook', or 'Queen').
   * @returns void
   */
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
        // positions.push(new Position(row, col + 1));
        // positions.push(new Position(row, col - 1));
        break;
      case 'Queen':
        positions.push(new Position(row + 2, col));
        positions.push(new Position(row - 2, col));
        positions.push(new Position(row + 4, col));
        positions.push(new Position(row - 4, col));
        // positions.push(new Position(row + 1, col));
        // positions.push(new Position(row - 1, col));
        break;
      case 'Bishop':
        // positions.push(new Position(row + 1, col + 1));
        // positions.push(new Position(row - 1, col + 1));
        // positions.push(new Position(row + 1, col - 1));
        // positions.push(new Position(row - 1, col - 1));
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
    // loop through the possible moves array and check if the selected destination's position is in the array
    // if it is, then return true, else return false
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

  /**
   * Ends the current player's turn and updates the game state accordingly.
   * @returns {boolean} True if the turn was ended successfully, false otherwise.
   */
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

    if (this.selectedDestination.player == 'X') {
      this.xPieces--;
    }

    if (this.selectedDestination.player == 'O') {
      this.oPieces--;
    }

    console.log('xPieces :>> ', this.xPieces + ' oPieces :>> ' + this.oPieces);

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
    } else {
      playerModifier.count--;
      console.log('Decremented modifier count for ' + playerModifier.type);
      this.selectedModifier = null;
    }

    // Flipping the current player owndership to the opponent
    this.swapPlayers();

    this.possibleMoves = [];
    this.selectedDestination = null;

    this.checkEndGame();

    // TODO - check if the game is over, draw, win, or loss

    return true;
  }

  swapPlayers() {
    const temp = this.activePlayer;
    this.activePlayer = this.passivePlayer;
    this.passivePlayer = temp;
  }

  checkEndGame(): boolean {
    //  check if the game is over, draw, win, or loss
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
    // reset the game board
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

    // reset the modifiers
    const initialModifiers: Modifier[] = [
      new Modifier('Pawn', 3),
      new Modifier('Rook', 3),
      new Modifier('Queen', 3),
    ];

    // reset the players
    if (this.activePlayer.name == 'X') {
      this.activePlayer = new Player('O', initialModifiers);
      this.passivePlayer = new Player('X', initialModifiers);
    } else {
      this.activePlayer = new Player('X', initialModifiers);
      this.passivePlayer = new Player('O', initialModifiers);
    }

    // reset the pieces
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

  constructor(name: 'X' | 'O', modifiers: Modifier[]) {
    this.name = name;
    this.modifiers = modifiers;
  }
}

export class Position {
  constructor(public row: number, public col: number) {}

  isInBounds(): boolean {
    const rowInBounds = this.row >= 0 && this.row <= 4;
    const colInBounds = this.col >= 0 && this.col <= 4;
    console.log('rowInBounds :>> ', rowInBounds);
    console.log('colInBounds :>> ', colInBounds);
    return rowInBounds && colInBounds;
  }
}

export class Modifier {
  constructor(
    public type: 'Pawn' | 'Rook' | 'Queen' | 'Bishop' | 'Knight',
    public count: number
  ) {}
}

export enum TurnStage {
  SELECT_PIECE,
  SELECT_MODIFIER,
  SELECT_DESTINATION,
  END_TURN,
}
