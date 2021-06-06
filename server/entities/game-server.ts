import { InputType } from "../../shared/enums/input-type";
import { Snake } from "./snake";

export class GameServer {
  private readonly snakes: Snake[] = [];
  private readonly mapSize = 20;

  constructor() {}

  public addSnake(player: Snake) {
    this.snakes.push(player);
  }

  public update() {
    this.snakes.forEach((player: Snake) => {
      if (this.isPlayerDead(player)) {
        player.kill();
      }

      player.update();
    });

    return {
      players: this.snakes.map((player: Snake) => ({
        id: player.id,
        x: player.x,
        y: player.y,
        isDead: player.isDead,
      })),
      mapSize: this.mapSize,
    };
  }

  private isPlayerDead(player: Snake): boolean {
    return (
      player.x + player.vel.x >= this.mapSize ||
      player.y + player.vel.y >= this.mapSize ||
      player.x + player.vel.x < 0 ||
      player.y + player.vel.y < 0
    );
  }

  public receiveInput(snakeId: string, moveInput: InputType) {
    const snake = this.snakes.find((snake) => snake.id === snakeId);

    snake?.updateVel(moveInput);
  }
}
