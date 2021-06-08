export interface GameState {
  players: {
    pos: { x: number; y: number }[];
    isDead: boolean;
  }[];
  foods: { x: number; y: number }[];
}
