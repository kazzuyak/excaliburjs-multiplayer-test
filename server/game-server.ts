import { InputType } from "../shared/enums/input-type";
import { Food } from "./entities/food";
import { Snake } from "./entities/snake";
import { SocketServer } from "./socket-server";

export class GameServer {
  private snakes: Snake[] = [];
  private readonly foods: Food[] = [];
  private readonly mapSize = 20;

  constructor(private readonly socketServer: SocketServer) {}

  public addSnake(id: string, nickname: string) {
    this.snakes.push(new Snake(id, nickname, 0, 0));
    this.foods.push(new Food(this.getRandomPos(), this.getRandomPos()));
  }

  public update() {
    this.snakes = this.snakes.filter((snake) => snake.pos.length > 0);

    if (this.snakes.length < this.foods.length) {
      this.foods.shift();
    }

    this.snakes.forEach((snake: Snake) => {
      this.onEatFood(snake);

      snake.update();
    });

    this.snakes.forEach((snake: Snake) => {
      if (!snake.isDead && this.isSnakeDead(snake)) {
        snake.kill();
        this.socketServer.sendDeathEvent(snake.id);
      }
    });

    this.socketServer.updateClients({
      players: this.snakes.map((snake: Snake) => ({
        pos: snake.pos,
        isDead: snake.isDead,
        nickname: snake.nickname,
        id: snake.id,
      })),
      foods: this.foods,
    });
  }

  private onEatFood(snake: Snake) {
    const nextPos = snake.getSnakeNextHeadPos();

    const food = this.foods.find(
      (food) => food.x === nextPos.x && food.y === nextPos.y,
    );

    if (food !== undefined) {
      food.updatePos(this.getRandomPos(), this.getRandomPos());
      snake.grow();
    }
  }

  private isSnakeDead(snake: Snake): boolean {
    const wallCollision =
      snake.pos[0].x >= this.mapSize ||
      snake.pos[0].y >= this.mapSize ||
      snake.pos[0].x < 0 ||
      snake.pos[0].y < 0;

    if (wallCollision) {
      return true;
    }

    const snakeCollision = this.snakes.some((otherSnake) => {
      return otherSnake.pos.some((usedPos, index) => {
        if (index === 0 && snake.id === otherSnake.id) {
          return false;
        }

        return snake.pos[0].x === usedPos.x && snake.pos[0].y === usedPos.y;
      });
    });

    return snakeCollision;
  }

  public receiveInput(snakeId: string, moveInput: InputType) {
    const snake = this.snakes.find(
      (snake) => snake.id === snakeId && !snake.isDead,
    );

    snake?.updateVel(moveInput);
  }

  private getRandomPos() {
    const min = Math.ceil(0);
    const max = Math.floor(this.mapSize - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
