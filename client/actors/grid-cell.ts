import { Actor, Body, Collider, CollisionType, Color, Shape, Vector } from "excalibur";

export class GridCell extends Actor {
  constructor(private readonly cellSize: number, pos: Vector) {
    super({
      pos,
      visible: false,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(cellSize, cellSize),
          type: CollisionType.PreventCollision,
        }),
      }),
    });
  }

  public setEmpty() {
    this.visible = false;
  }

  public setSnake() {
    this.visible = true;
    this.color = Color.Green;
  }

  public setDeadSnake() {
    this.visible = true;
    this.color = Color.DarkGray;
  }

  public setFood() {
    this.visible = true;
    this.color = Color.Vermilion;
  }
}