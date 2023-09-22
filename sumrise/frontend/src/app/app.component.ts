import { Component } from '@angular/core';

// turn
// -> piece
// -> modifier
// -> target spot

// win logic:
// 1. No more modifiers on either player
// 2. One players peices are all gone

// Board

class Position {
  row: number = 0;
  column: number = 0;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  isLegal(dimensionLength: number): boolean {
    if (this.row < 0 || this.column < 0) {
      return false;
    }

    if (this.row >= dimensionLength || this.column >= dimensionLength) {
      return false;
    }

    return true;
  }
}

// pawnIndex = 0
// rookIndex = 0
// queenIndex = 0
// modifiers = [0, 1, 2]

enum Modifier {
  pawn,
  rook,
  queen,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  BOARD_DIMENSION = 4;
  board: string[][];
  title = 'frontend';

  constructor() {
    const positions = this.PossibleMoves(new Position(1, 0), Modifier.pawn);
    console.log('positions :>> ', positions);
    this.board = [
      ['B', 'B', 'B', 'B'],
      ['', '', '', ''],
      ['', '', '', ''],
      ['W', 'W', 'W', 'W'],
    ];
  }

  startGame() {}

  turn() {}

  PossibleMoves(spot: Position, modifier: Modifier): Position[] {
    switch (modifier) {
      case Modifier.pawn:
        const positions: Position[] = [];
        positions.push(new Position(spot.row + 1, spot.column));
        positions.push(new Position(spot.row - 1, spot.column));
        positions.push(new Position(spot.row, spot.column + 1));
        positions.push(new Position(spot.row, spot.column - 1));

        return positions.filter((position) =>
          position.isLegal(this.BOARD_DIMENSION)
        );
      case Modifier.rook:
        return [];
      case Modifier.queen:
        return [];
      default:
        return [];
    }
  }

  move(src: Position, dest: Position) {
    // temp = board[srcRow, srcCol]
    // board[srcRow, srcCol] = ''
    // board[destRow, destCol] = temp
  }
}
