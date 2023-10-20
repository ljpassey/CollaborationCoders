import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { Piece, Position, Modifier, Game } from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  // TODO - eventually, we'll utilize a subscription to get updates to the `Game`
  // gameSubscription!: Subscription;
  game: Game;
  constructor(private gameService: GameService) {
    const initialModifiers: Modifier[] = [
      new Modifier('Pawn', 3),
      new Modifier('Rook', 0),
      new Modifier('Queen', 0),
    ];

    // TODO - have dice-roll determine 'X' vs. 'O'
    this.game = new Game('X', initialModifiers);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  selectTile(row: number, col: number) {
    const selectedTile = this.game.board[row][col];
    if (selectedTile.player === this.game.activePlayer.name) {
      this.selectPiece(row, col);
    } else {
      this.selectDestination(row, col);
    }
  }

  selectPiece(row: number, col: number): void {
    const selectedPiece = this.game.board[row][col];
    console.log('selectedPiece :>> ', selectedPiece.position);
    if (!this.game.selectPiece(selectedPiece)) {
      alert('Couldnt select piece');
    }
  }

  selectModifier(type: 'Pawn' | 'Rook' | 'Queen') {
    console.log('type :>> ', type);
    const selectedModifier = type;
    console.log('selectedModifier :>> ', selectedModifier);

    const selectedPiece = this.game.selectedPiece;
    const row = selectedPiece?.position.row;
    const col = selectedPiece?.position.col;

    if (!this.game.selectModifier(type)) {
      alert('Couldnt select modifier');
    }

    this.game.getPossibleMoves(row, col, type);
  }

  selectDestination(row: number, col: number): void {
    const selectedDestination = this.game.board[row][col];
    console.log('selectedDestination :>> ', selectedDestination);
    if (!this.game.selectDestination(selectedDestination)) {
      alert('Couldnt select destination');
    }
  }

  confirmAndEndTurn() {
    if (!this.game.endTurn()) {
      alert('Something prevented the turn from being ended...');
    }
  }

  getCellClass(i: number, j: number): string {
    const piece = this.game.board[i][j];
    const moveRow = piece.position.row;
    const moveCol = piece.position.col;

    if (piece) {
      if (piece === this.game.selectedPiece) {
        return 'selected';
      } else if (piece === this.game.selectedDestination) {
        return 'destination';
      } else if (
        piece.player === this.game.activePlayer.name &&
        !this.game.selectedPiece
      ) {
        return 'selectable';
      } else {
        for (let move of this.game.possibleMoves) {
          if (move.row === moveRow && move.col === moveCol) {
            return 'possibleMove';
          }
        }
      }
    }

    return 'disabled';
  }
}
