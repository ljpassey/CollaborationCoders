import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
})
export class DiceComponent implements OnInit {
  diceRoll: number = 0
  constructor(private gameService: GameService) {}

  rollDice(): void {
    this.diceRoll = this.gameService.rollDice();
    // Handle the result
  }

  ngOnInit(): void {}
}
