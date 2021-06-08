import express from "express";
import http from "http";
import Bundler from "parcel-bundler";
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

const bundler = new Bundler(__dirname + "/../client/game.html", {});
app.use(bundler.middleware());

server.listen(process.env.PORT || 3000);
