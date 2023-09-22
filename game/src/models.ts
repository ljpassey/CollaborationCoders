export class Position {
  constructor(public row: number, public col: number) {}
}

export class Piece {
  constructor(public player: string, public position: Position) {}
}

export class Modifier {
  constructor(public type: 'Pawn' | 'Rook' | 'Queen', public count: number) {}
}
