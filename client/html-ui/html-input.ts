interface IHtmlInput {
  borderWidth: number;
  fontSize: number;
  height: number;
  width: number;
  x: number;
  y: number;
  buttonId: string;
  divId: string;
}
export class HtmlInput {
  private isWritten = false;
  private visibility: "hidden" | "visible" = "visible";

  constructor(public options: IHtmlInput) {
    this.write();
  }

  public hide() {
    this.visibility = "hidden";
    this.remove();
    this.write();
  }

  private remove() {
    document.getElementById(this.options.divId)?.remove();
    this.isWritten = false;
  }

  private write() {
    if (this.isWritten) {
      return;
    }

    const div = document.createElement("div");
    div.id = this.options.divId;

    div.innerHTML += `
      <input
      id=${this.options.buttonId}
      type="text"
      placeholder="Enter your nickname"
      autofocus
      maxlength="25"
      style="
        height: ${this.options.height}px;
        width: ${this.options.width}px;
        left: ${this.options.x}px;
        top: ${this.options.y}px;
        visibility: ${this.visibility};
        border-color: white;
        position: absolute;
        color: white;
        text-align:center;
        background-color: transparent;
        font-size: ${this.options.fontSize}px;
        border: none;
        font-family: 'Times New Roman', Times, serif;
        touch-action: none;
        outline: none;
      ">`;

    document.getElementById("ui")?.appendChild(div);

    const inputElement = document.getElementById(`${this.options.buttonId}`);

    if (inputElement !== null) {
      inputElement.addEventListener("click", () => inputElement.focus());
    }

    this.isWritten = true;
  }
}
