export class Food {
  constructor(public x: number, public y: number) {}

  public updatePos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
