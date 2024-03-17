import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate number 1-6 when we simulate a dice roll', () => {
    const diceRoll = service.rollDice();
    expect(diceRoll > 0 && diceRoll < 7).toBeTrue();
  });
});
