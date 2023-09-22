import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent implements OnInit {
  modifiers: any[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.modifiers = this.gameService.modifiers;
  }

selectModifier(modifier: Modifier): void {
  // Check if it's the current player's turn and the modifier count is greater than zero
  if (this.gameService.currentPlayer === 'Player1' && modifier.count > 0) {
    // Use the modifier
    this.gameService.useModifier(modifier);

    // Update the UI to show the new count for the selected modifier
    this.modifiers = this.gameService.modifiers;
  }
}

}
