import express from "express";
import http from "http";
import Bundler from "parcel-bundler";
import { SocketConnection } from "./socket-connection";

const app = express();

const server = http.createServer(app);
new SocketConnection(server).listen();

const bundler = new Bundler(__dirname + "/../client/game.html", {});
app.use(bundler.middleware());

server.listen(process.env.PORT || 3000);
