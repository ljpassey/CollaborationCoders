import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Piece } from 'src/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board!: any[][];
  chosenPiece!: Piece;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.board = this.gameService.board;
  }

  selectTile(row: number, col: number): void {
    this.chosenPiece = this.board[row][col];
    console.log(this.chosenPiece);

    // Check if the selected tile contains a piece
    if (this.chosenPiece) {
      // Check if it belongs to the current player
      if (this.chosenPiece.player === this.gameService.currentPlayer) {
        // Select the piece
        this.gameService.selectPiece(this.chosenPiece);
      }
    }
  }
}
