import { Color, FontStyle, Label, TextAlign } from "excalibur";

export class NicknameLabel extends Label {
  constructor(public playerId: string, public nickname: string, x: number, y: number, fontSize: number) {
    super({
      text: nickname,
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