import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Piece } from 'src/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  board!: any[][];
  chosenPiece!: Piece;
  currentPlayer: any;

  constructor(private gameService: GameService) {
    this.currentPlayer = this.gameService.currentPlayer;
    this.board = this.gameService.board;
  }

  selectTile(row: number, col: number, currentPlayer: 'X' | 'O' | ''): void {
    this.chosenPiece = this.board[row][col];
    this.currentPlayer = this.gameService.currentPlayer;

    if (this.chosenPiece.player === this.gameService.currentPlayer) {
      this.gameService.selectPiece(this.chosenPiece);
      console.log(this.chosenPiece);
    } else {
      alert('Please select a tile with your piece');
    }
  }
}
