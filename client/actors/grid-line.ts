import { Actor, Body, Collider, CollisionType, Color, Shape, Vector } from "excalibur";

interface IGridLineParameters {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class GridLine extends Actor {
  constructor(parameters: IGridLineParameters) {
    super({
      x: parameters.x,
      y: parameters.y,
      color: Color.DarkGray,
      opacity: 0.2,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(parameters.width, parameters.height),
          type: CollisionType.PreventCollision,
        }),
      }),
    });
  }

  public updateSize(parameters: IGridLineParameters) {
    this.pos.x = parameters.x;
    this.pos.y = parameters.y;
    this.width = parameters.width;
    this.height = parameters.height;
  }
}
