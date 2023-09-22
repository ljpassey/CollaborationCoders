import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board!: any[][];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.board = this.gameService.board;
  }

  selectTile(row: number, col: number): void {
  const selectedPiece = this.board[row][col];

  // Check if the selected tile contains a piece
  if (selectedPiece) {
    // Check if the piece belongs to the current player
    if (selectedPiece.player === this.gameService.currentPlayer) {
      // Logic for selecting the piece
      this.gameService.selectPiece(selectedPiece);

      // Logic to show valid moves based on available modifiers
      // This could also be handled within the GameService
    } else {
      // The piece belongs to the opponent, cannot be selected
    }
  } else {
    // The tile is empty, check if it's a valid move for the previously selected piece
    const validMove = this.gameService.isValidMove(/* arguments */);

    if (validMove) {
      this.gameService.makeMove(/* start position */, /* end position */);

      // Check for end game conditions
      if (this.gameService.checkEndGame()) {
        // Handle end game
      }
    }
  }
}

}
