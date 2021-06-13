import express from "express";
import https from "https";
import path from "path";
import { GameLoop } from "./game-loop";
import { GameServer } from "./game-server";
import { SocketServer } from "./socket-server";

const app = express();

const server = https.createServer(app);
const socketServer = new SocketServer(server);

const gameLoop = new GameLoop();
socketServer.addEmptyServerListener(gameLoop.stopLoop.bind(gameLoop));

const gameServer = new GameServer(socketServer, gameLoop);
socketServer.addJoinGameListener(gameServer.addSnake.bind(gameServer));
socketServer.addInputListener(gameServer.receiveInput.bind(gameServer));
gameLoop.addListener(gameServer.update.bind(gameServer));

app.use(express.static(path.join(__dirname, "../client")));
app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../client/game.html"));
});

server.listen(process.env.PORT || 3000);
