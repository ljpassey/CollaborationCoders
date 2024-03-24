Gameplay Ideas for Gridlock: 
1. Add the ability to select up to two modifiers in combination during your turn to maneuver further on the board. 
2. Implement a challenging way for players to bring pieces back into play after they have been eliminated. 
3. Add saving dice throws which allow a player to sacrifice one of their pawn modifiers for the chance to roll a dice to determine whether an attacker will succeed or fail, and make it dependant on the number of pieces the player has left. If the dice roll is higher than the number of pieces the player has left, the attacker succeeds. If the dice roll is lower than the number of pieces the player has left, the attacker fails and the piece is not eliminated and the attacker returns to his original position and the turn ends. 
4. Add a default movement of 1 space for all pieces which players can use at the beginning of their turn, then they can choose to use modifiers to move further.
5. Add specific areas of the game board that have different effects on the pieces that land on them. For example, if you stay within the middle 4 tiles for more than 2 turns, you can bring one of your pieces back into play.

## Possible example data model for Realtime DB:
{
  "gameId": "unique_game_id",
  "state": "in_progress",
  "turn": {
    "currentPlayerId": "player_1_id"
  },
  "players": [
    {
      "playerId": "player_1_id",
      "position": { /* specific position data */ },
      "modifiers": [ /* list of modifiers */ ],
      "pieces": 5
    },
    {
      "playerId": "player_2_id",
      "position": { /* specific position data */ },
      "pieces": 5
    }
  ],
  "board": { /* board state here */ },
  "actions": [ /* log of actions or moves for replay/history */ ]
}

## To Do:
- [ ] Configure a loading screen for when it is the other player's turn.
- [ ] Implement a way to save the game state to the database.
- [ ] Implement a way to load the game state from the database.
- [ ] Setup the login and authentication methods and allow users to be created and logged in.
- [ ] 
