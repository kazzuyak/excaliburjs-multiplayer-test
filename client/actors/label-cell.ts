import { Color, FontStyle, Label, TextAlign } from "excalibur";

export class LabelCell extends Label {
  constructor(x: number, y: number, fontSize: number) {
    super({
      x,
      y,
      fontSize,
      fontStyle: FontStyle.Oblique,
      color: Color.Vermilion,
      textAlign: TextAlign.Center,
      bold: true
    })
  }
}