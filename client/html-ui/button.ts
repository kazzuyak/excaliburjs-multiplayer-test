interface IButton {
  borderWidth: number;
  fontSize: number;
  height: number;
  width: number;
  x: number;
  y: number;
  text: string;
  buttonId: string;
  divId: string;
  onClick: () => void;
}
export class Button {
  private isWritten = false;
  private visibility: "hidden" | "visible" = "visible";

  constructor(public options: IButton) {
    this.write();
  }

  public update() {
    this.remove();
    this.write();
  }

  public hide() {
    this.visibility = "hidden";
    this.update();
  }

  public show() {
    this.visibility = "visible";
    this.update();
  }

  public remove() {
    document.getElementById(this.options.divId)?.remove();
    this.isWritten = false;
  }

  public write() {
    if (this.isWritten) {
      return;
    }

    const div = document.createElement("div");
    div.id = this.options.divId;

    div.innerHTML += `
      <button
      id=${this.options.buttonId}
      style="
        height: ${this.options.height}px;
        width: ${this.options.width}px;
        left: ${this.options.x}px;
        top: ${this.options.y}px;
        border-color: white;
        position: absolute;
        color: white;
        cursor: pointer;
        background-color: black;
        visibility: ${this.visibility};
        border-width: ${this.options.borderWidth}px;
        font-size: ${this.options.fontSize}px;
        font-family: 'Times New Roman', Times, serif;
        touch-action: none;
      ">
        ${this.options.text}
      </button>`;

    document.getElementById("ui")?.appendChild(div);

    document
      .getElementById(`${this.options.buttonId}`)
      ?.addEventListener("pointerup", this.onClick.bind(this));

    this.isWritten = true;
  }

  private onClick() {
    this.options.onClick();
  }
}
