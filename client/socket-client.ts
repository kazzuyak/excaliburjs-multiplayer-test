import { io } from "socket.io-client";
import { GameState } from "../shared/contracts/game-state";
import { InputType } from "../shared/enums/input-type";

type PingCallback = (gameState: GameState) => void;
type OnDeathCallBack = () => void;

export class SocketClient {
  private readonly socket = io();
  private onPingListeners: PingCallback[] = [];
  private onDeathListeners: OnDeathCallBack[] = [];

  constructor() {
    this.socket.on("disconnect", () => {
      location.reload();
    });
    this.socket.on("ping", (gameState: GameState) => {
      this.onPingListeners.forEach((listener) => listener(gameState));
    });
    this.socket.on("dead", () => {
      this.onDeathListeners.forEach((listener) => listener());
    });
  }

  public addOnPingListener(callback: PingCallback) {
    this.onPingListeners.push(callback);
  }

  public addOnDeathListener(callback: OnDeathCallBack) {
    this.onDeathListeners.push(callback);
  }

  public joinGame(nickname: string) {
    this.socket.emit("join", nickname);
  }

  public sendInput(input: InputType) {
    this.socket.emit("input", input);
  }
}
