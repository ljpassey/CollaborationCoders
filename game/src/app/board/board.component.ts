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

    if (
      this.chosenPiece &&
      this.chosenPiece.player === this.gameService.currentPlayer
    ) {
      this.gameService.selectPiece(this.chosenPiece);
    }
  }
}
