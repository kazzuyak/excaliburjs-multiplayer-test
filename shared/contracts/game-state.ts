export interface GameState {
  players: {
    x: number;
    y: number;
    isDead: boolean;
  }[];
}
