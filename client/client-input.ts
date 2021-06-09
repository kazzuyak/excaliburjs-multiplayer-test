import { Engine, Vector } from "excalibur";
import { KeyEvent, Keys } from "excalibur/dist/Input/Keyboard";
import { PointerType } from "excalibur/dist/Input/Pointer";
import {
  PointerDownEvent,
  PointerMoveEvent,
} from "excalibur/dist/Input/PointerEvents";
import { InputType } from "../shared/enums/input-type";

export class ClientInput {
  private readonly listeners: ((input: InputType) => void)[] = [];
  private lastPointerPosition?: Vector;

  public constructor(engine: Engine) {
    engine.input.keyboard.on("press", this.onKeyPress.bind(this));
    engine.input.pointers.primary.on("down", this.onPointerDown.bind(this));
    engine.input.pointers.primary.on("move", this.onPointerMove.bind(this));
    engine.input.pointers.primary.on("up", this.onPointerUp.bind(this));
  }

  public addListener(callback: (input: InputType) => void) {
    this.listeners.push(callback);
  }

  private onKeyPress(event: KeyEvent) {
    const keyMap: {
      [K in Keys]?: InputType;
    } = {
      [Keys.W]: InputType.up,
      [Keys.A]: InputType.left,
      [Keys.S]: InputType.down,
      [Keys.D]: InputType.right,
    };

    const input = keyMap[event.key];

    if (input !== undefined) {
      this.listeners.forEach((listener) => listener(input));
    }
  }

  private onPointerDown(event: PointerDownEvent) {
    this.lastPointerPosition = event.pos;
  }

  private onPointerMove(event: PointerMoveEvent) {
    if (
      this.lastPointerPosition === undefined ||
      event.pointerType === "Mouse"
    ) {
      return;
    }

    const xDiff = event.pos.x - this.lastPointerPosition.x;
    const yDiff = event.pos.y - this.lastPointerPosition.y;

    this.lastPointerPosition = undefined;

    if (Math.abs(xDiff) >= Math.abs(yDiff)) {
      if (xDiff >= 0) {
        this.listeners.forEach((listener) => listener(InputType.right));

        return;
      }

      this.listeners.forEach((listener) => listener(InputType.left));

      return;
    }

    if (yDiff >= 0) {
      this.listeners.forEach((listener) => listener(InputType.down));

      return;
    }

    this.listeners.forEach((listener) => listener(InputType.up));
  }

  private onPointerUp() {
    this.lastPointerPosition = undefined;
  }
}
