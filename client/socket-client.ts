import { io } from "socket.io-client";
import { GameState } from "../shared/contracts/game-state";
import { InputType } from "../shared/enums/input-type";

type PingCallback = (gameState: GameState) => void;

export class SocketClient {
  private readonly socket = io();
  private onPingListeners: PingCallback[] = [];

  constructor() {
    this.socket.on("disconnect", () => {
      location.reload();
    });
    this.socket.on("ping", (gameState: GameState) => {
      this.onPingListeners.forEach((listener) => listener(gameState));
    });
  }

  public addOnPingListener(callback: PingCallback) {
    this.onPingListeners.push(callback);
  }

  public joinGame() {
    this.socket.emit("join");
  }

  public sendInput(input: InputType) {
    this.socket.emit("input", input);
  }
}
