import { io } from "socket.io-client";
import { InputType } from "../shared/enums/input-type";

interface IPing {
  players: { x: number; y: number; id: string }[];
}

type PingCallback = (parameters: IPing) => void;

export class SocketClient {
  private readonly socket = io();
  private onPingListeners: PingCallback[] = [];

  constructor() {
    this.socket.on("disconnect", () => {
      location.reload();
    });
    this.socket.on("ping", (parameters: IPing) => {
      this.onPingListeners.forEach((listener) => listener(parameters));
    });
  }

  public addOnPingListener(callback: PingCallback) {
    this.onPingListeners.push(callback);
  }

  public sendInput(input: InputType) {
    this.socket.emit("input", input);
  }
}
