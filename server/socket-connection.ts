import http from "http";
import { Server } from "socket.io";
import { InputType } from "../shared/enums/input-type";
import { GameServer } from "./entities/game-server";
import { Snake } from "./entities/snake";

export class SocketConnection {
  private readonly io: Server;
  private serverInterval?: NodeJS.Timeout;
  private readonly gameServer = new GameServer();
  private clients: { [K in string]: {} } = {};

  constructor(server: http.Server) {
    this.io = new Server(server);
  }

  public listen() {
    this.io.on("connection", (socket) => {
      this.clients[socket.id] = {};

      this.startServer();

      const player = new Snake(socket.id, 10, 10);

      this.gameServer.addSnake(player);

      socket.on("input", this.onInput.bind(this, socket.id));

      socket.on("disconnect", () => {
        delete this.clients[socket.id];
        this.stopServerIfEmpty();
      });
    });
  }

  private startServer() {
    if (this.serverInterval !== undefined) {
      return;
    }

    this.serverInterval = setInterval(() => {
      const gameState = this.gameServer.update();
      this.io.emit("ping", gameState);
    }, 500);
  }

  private onInput(socketId: string, moveInput: InputType) {
    this.gameServer.receiveInput(socketId, moveInput);
  }

  private stopServerIfEmpty() {
    if (this.serverInterval === undefined) {
      return;
    }

    if (Object.keys(this.clients).length === 0) {
      clearInterval(this.serverInterval);
      this.serverInterval = undefined;
    }
  }
}
