import {
  Color,
  DisplayMode,
  Engine
} from "excalibur";
import { KeyEvent, Keys } from "excalibur/dist/Input/Keyboard";
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
    [K in Keys]?: InputType
  } = {
    [Keys.W]: InputType.up,
    [Keys.A]: InputType.left,
    [Keys.S]: InputType.down,
    [Keys.D]: InputType.right,
  }

  const input = keyMap[event.key];

  if (input !== undefined) {
    socketClient.sendInput(input);
  }
});

engine.addScene("game", gameScene);
engine.goToScene("game");

engine.start();
