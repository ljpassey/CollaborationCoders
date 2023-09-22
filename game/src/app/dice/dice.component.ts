import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
})
export class DiceComponent implements OnInit {
  constructor(private gameService: GameService) {}

  rollDice(): void {
    const result = this.gameService.rollDice();
    // Handle the result
  }

  ngOnInit(): void {}
}
