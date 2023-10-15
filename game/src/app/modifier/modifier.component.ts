import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Modifier } from 'src/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent implements OnInit {
  boardSubscription!: Subscription;
  playerSubscription!: Subscription;
  modifiersSubscription!: Subscription;

  constructor(private gameService: GameService) {}

  modifiers: Modifier[] = [
    { type: 'Pawn', count: 5 },
    { type: 'Rook', count: 5 },
    { type: 'Queen', count: 5 },
  ];

  ngOnInit(): void {
    let modifiers = this.gameService.modifiers$;
    console.log(modifiers);
  }

  selectModifier(modifier: Modifier): void {
    // Check if it's the current player's turn and the modifier count is greater than zero
    if (this.gameService.currentPlayer$ && modifier.count > 0) {
      // Decrement the modifier count
      modifier.count--;
      // Use the modifier
      // this.gameService.updateModifiers(modifier);

      // Update the UI to show the new count for the selected modifier
    }
  }
}
