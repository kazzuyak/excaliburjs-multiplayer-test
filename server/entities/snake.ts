import { InputType } from "../../shared/enums/input-type";

export class Snake {
  public vel = {
    x: 1,
    y: 0,
  };
  public isDead = false;

  constructor(public readonly id: string, public x: number, public y: number) {}

  public update() {
    if (this.isDead) {
      return;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  public updateVel(input: InputType) {
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
}
