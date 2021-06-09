import { Color, Label, TextAlign } from "excalibur";

export class LabelCell extends Label {
  constructor(x: number, y: number, fontSize: number) {
    super({
      x,
      y,
      fontSize,
      color: Color.Vermilion,
      textAlign: TextAlign.Center,
      bold: true,
      fontFamily: "'Courier New', monospace",
    })
  }
}