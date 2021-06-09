export interface GameState {
  players: {
    pos: { x: number; y: number }[];
    isDead: boolean;
    nickname: string;
  }[];
  foods: { x: number; y: number }[];
}
