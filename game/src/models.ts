export class Position {
  constructor(public row: number, public col: number) {}
}

export class Piece {
  constructor(
    public player: 'X' | 'O' | '',
    public position: Position
  ) {}
}

export class Modifier {
  constructor(public type: 'Pawn' | 'Rook' | 'Queen', public count: number) {}
}

export class Step {
  constructor(
    public step:
      | 'Select Tile'
      | 'Select Modifier'
      | 'Select Destination'
      | 'End Turn'
  ) {}
}
