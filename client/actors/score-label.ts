import { Color, Label } from "excalibur";

export class ScoreLabel extends Label {
  constructor(x: number, y: number, fontSize: number) {
    super({
      x,
      y,
      fontSize,
      text: "Score: 0",
      color: Color.White,
      fontFamily: "'Courier New', monospace",
      opacity: 0.9
    })
  }
}