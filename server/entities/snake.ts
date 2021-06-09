import { InputType } from "../../shared/enums/input-type";

export class Snake {
  public vel = {
    x: 1,
    y: 0,
  };
  public isDead = false;
  public pos: { x: number; y: number }[] = [];
  private shouldGrow = false;

  constructor(public readonly id: string, public readonly nicknname: string, x: number, y: number) {
    this.pos.push({ x, y });
  }

  public update() {
    if (this.isDead) {
      this.pos.pop();

      return;
    }

    let lastPosition: { x: number; y: number } | undefined;

    this.pos.forEach((position) => {
      const positionBeforeUpdate = {
        x: position.x,
        y: position.y,
      };

      if (lastPosition !== undefined) {
        position.x = lastPosition.x;
        position.y = lastPosition.y;
      }

      lastPosition = {
        x: positionBeforeUpdate.x,
        y: positionBeforeUpdate.y,
      };
    });

    if (this.shouldGrow === true) {
      this.shouldGrow = false;

      if (lastPosition !== undefined) {
        this.pos.push({
          x: lastPosition.x,
          y: lastPosition.y,
        });
      }
    }

    this.pos[0].x += this.vel.x;
    this.pos[0].y += this.vel.y;
  }

  public grow() {
    this.shouldGrow = true;
  }

  public updateVel(input: InputType) {
    const neckPos = this.pos[1];

    if (neckPos !== undefined) {
      const headPos = this.pos[0];

      if (
        neckPos.y === headPos.y &&
        (input === InputType.left || input === InputType.right)
      ) {
        return;
      }

      if (
        neckPos.x === headPos.x &&
        (input === InputType.down || input === InputType.up)
      ) {
        return;
      }
    }

    this.vel.x = 0;
    this.vel.y = 0;

    if (input === InputType.down) {
      this.vel.y = 1;
    }

    if (input === InputType.up) {
      this.vel.y = -1;
    }

    if (input === InputType.left) {
      this.vel.x = -1;
    }

    if (input === InputType.right) {
      this.vel.x = 1;
    }
  }

  public kill() {
    this.vel = {
      x: 0,
      y: 0,
    };
    this.isDead = true;
  }

  public getSnakeNextHeadPos() {
    return {
      x: this.pos[0].x + this.vel.x,
      y: this.pos[0].y + this.vel.y,
    };
  }
}
