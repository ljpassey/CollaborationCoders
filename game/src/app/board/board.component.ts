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
      // Check if it belongs to the current player
      if (selectedPiece.player === this.gameService.currentPlayer) {
        // Select the piece
        this.gameService.selectPiece(selectedPiece);
      }
    }
  }
}
