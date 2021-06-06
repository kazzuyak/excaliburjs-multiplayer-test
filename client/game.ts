import { Color, DisplayMode, Engine, Vector } from "excalibur";
import { KeyEvent, Keys } from "excalibur/dist/Input/Keyboard";
import {
  PointerDownEvent,
  PointerUpEvent,
} from "excalibur/dist/Input/PointerEvents";
import { InputType } from "../shared/enums/input-type";
import { GameScene } from "./scenes/game-scene";
import { SocketClient } from "./socket-client";

const socketClient = new SocketClient();

const engine = new Engine({
  backgroundColor: Color.Black,
  displayMode: DisplayMode.FullScreen,
});

const gameScene = new GameScene(engine, socketClient);

socketClient.addOnPingListener(gameScene.receiveUpdate.bind(gameScene));

engine.input.keyboard.on("press", (event: KeyEvent) => {
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
    socketClient.sendInput(input);
  }
});

let lastPos: Vector | undefined;

engine.input.pointers.primary.on("down", (event: PointerDownEvent) => {
  lastPos = event.pos;
});

engine.input.pointers.primary.on("up", (event: PointerUpEvent) => {
  if (lastPos === undefined) {
    return;
  }

  const xDiff = event.pos.x - lastPos.x;
  const yDiff = event.pos.y - lastPos.y;

  if (Math.abs(xDiff) >= Math.abs(yDiff)) {
    if (xDiff >= 0) {
      socketClient.sendInput(InputType.right);

      return;
    }

    socketClient.sendInput(InputType.left);

    return;
  }

  if (yDiff >= 0) {
    socketClient.sendInput(InputType.down);

    return;
  }

  socketClient.sendInput(InputType.up);
});

engine.addScene("game", gameScene);
engine.goToScene("game");

engine.start();
