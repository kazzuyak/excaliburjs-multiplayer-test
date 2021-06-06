import { Engine } from "excalibur";

export class ScreenInformation {
  public readonly screenSize: number;
  public readonly startingY: number;
  public readonly startingX: number;
  public readonly endingX: number;
  public readonly endingY: number;
  public readonly halfX: number;
  public readonly halfY: number;

  constructor(engine: Engine) {
    this.screenSize =
      engine.drawHeight < engine.drawWidth
        ? engine.drawHeight
        : engine.drawWidth;

    this.startingY = (engine.drawHeight - this.screenSize) / 2;

    this.startingX = (engine.drawWidth - this.screenSize) / 2;

    this.endingX = this.screenSize + this.startingX;
    this.endingY = this.screenSize + this.startingY;

    this.halfX = this.startingX + this.screenSize / 2;
    this.halfY = this.startingY + this.screenSize / 2;
  }
}
