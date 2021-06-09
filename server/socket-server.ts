import http from "http";
import { Server, Socket } from "socket.io";
import { GameState } from "../shared/contracts/game-state";
import { InputType } from "../shared/enums/input-type";

type JoinGameListener = (id: string, nickname: string) => void;
type InputListener = (id: string, input: InputType) => void;
type EmptyServerListener = () => void;

export class SocketServer {
  private readonly io: Server;
  private clients: { [K in string]?: Socket } = {};
  private joinGameListeners: JoinGameListener[] = [];
  private inputListeners: InputListener[] = [];
  private emptyServerListeners: EmptyServerListener[] = [];

  constructor(server: http.Server) {
    this.io = new Server(server);
    this.io.on("connection", this.onConnection.bind(this));
  }

  public updateClients(gameState: GameState) {
    this.io.emit("ping", gameState);
  }

  public sendDeathEvent(id: string) {
    this.clients[id]?.emit("dead");
  }

  public addJoinGameListener(callback: JoinGameListener) {
    this.joinGameListeners.push(callback);
  }

  public addInputListener(callback: InputListener) {
    this.inputListeners.push(callback);
  }

  public addEmptyServerListener(callback: EmptyServerListener) {
    this.emptyServerListeners.push(callback);
  }

  private onConnection(socket: Socket) {
    this.clients[socket.id] = socket;

    socket.on("join", (nickname: string) => {
      this.joinGameListeners.forEach((listener) => listener(socket.id, nickname));
    });

    socket.on("input", (input: InputType) => {
      this.inputListeners.forEach((listener) => {
        listener(socket.id, input);
      });
    });

    socket.on("disconnect", () => {
      delete this.clients[socket.id];

      if (Object.keys(this.clients).length === 0) {
        this.emptyServerListeners.forEach((listener) => listener());
      }
    });
  }
}
