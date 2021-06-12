import express from "express";
import http from "http";
import path from "path";
import { GameLoop } from "./game-loop";
import { GameServer } from "./game-server";
import { SocketServer } from "./socket-server";

const app = express();

const server = http.createServer(app);
const socketServer = new SocketServer(server);

const gameLoop = new GameLoop();
socketServer.addEmptyServerListener(gameLoop.stopLoop.bind(gameLoop));
socketServer.addJoinGameListener(gameLoop.startLoop.bind(gameLoop));

const gameServer = new GameServer(socketServer);
socketServer.addJoinGameListener(gameServer.addSnake.bind(gameServer));
socketServer.addInputListener(gameServer.receiveInput.bind(gameServer));
gameLoop.addListener(gameServer.update.bind(gameServer));


app.use(express.static(path.join(__dirname, "../client")));
app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../client/game.html"));
});


server.listen(process.env.PORT || 3000);
