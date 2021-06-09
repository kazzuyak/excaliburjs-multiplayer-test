export interface GameState {
  players: {
    pos: { x: number; y: number }[];
    isDead: boolean;
    nickname: string;
    id: string;
  }[];
  foods: { x: number; y: number }[];
}
