import http from "http";
import { Server } from "socket.io";
import { InputType } from "../shared/enums/input-type";

export class SocketServer {
  private readonly io: Server;
  private clients: { [K in string]: {} } = {};
  private connectionListeners: ((id: string) => void)[] = [];
  private inputListeners: ((id: string, input: InputType) => void)[] = [];

  constructor(server: http.Server) {
    this.io = new Server(server);
    this.io.on("connection", (socket) => {
      this.clients[socket.id] = {};

      this.connectionListeners.forEach((listener) => listener(socket.id));

      socket.on("input", (input: InputType) => {
        this.inputListeners.forEach(listener => {
          listener(socket.id, input)
        })
      });

      socket.on("disconnect", () => {
        delete this.clients[socket.id];

        if (Object.keys(this.clients).length === 0) {
        }
      });
    });
  }

  public addConnectionListeners(callback: (id: string) => void) {
    this.connectionListeners.push(callback);
  }

  public updateClients(gameState: object) {
    this.io.emit("ping", gameState);
  }

  public addInputListeners(callback: (id: string, input: InputType) => void) {
    this.inputListeners.push(callback);
  }
}
