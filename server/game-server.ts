import { InputType } from "../shared/enums/input-type";
import { Snake } from "./entities/snake";
import { SocketServer } from "./socket-server";

export class GameServer {
  private readonly snakes: Snake[] = [];
  private readonly mapSize = 20;

  constructor(private readonly socketServer: SocketServer) {}

  public addSnake(id: string) {
    this.snakes.push(new Snake(id, 10, 10));
  }

  public update() {
    this.snakes.forEach((player: Snake) => {
      if (this.isPlayerDead(player)) {
        player.kill();
      }

      player.update();
    });

    this.socketServer.updateClients({
      players: this.snakes.map((player: Snake) => ({
        x: player.x,
        y: player.y,
        isDead: player.isDead,
      }))
    });
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
