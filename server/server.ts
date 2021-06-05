import express from "express";
import Bundler from "parcel-bundler";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
})

const bundler = new Bundler(__dirname + "/../client/game.html", {});
app.use(bundler.middleware());

server.listen(process.env.PORT || 3000);
