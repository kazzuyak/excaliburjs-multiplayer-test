import { Color, DisplayMode, Engine } from "excalibur";
import { ClientInput } from "./client-input";
import { GameScene } from "./scenes/game-scene";
import { SocketClient } from "./socket-client";

const socketClient = new SocketClient();

const engine = new Engine({
  backgroundColor: Color.Black,
  displayMode: DisplayMode.FullScreen,
});

const gameScene = new GameScene(engine, socketClient);
socketClient.addOnPingListener(gameScene.receiveUpdate.bind(gameScene));
socketClient.addOnDeathListener(gameScene.onDeath.bind(gameScene));

const clientInput = new ClientInput(engine);
clientInput.addListener(socketClient.sendInput.bind(socketClient));

engine.addScene("game", gameScene);
engine.goToScene("game");

engine.start();
