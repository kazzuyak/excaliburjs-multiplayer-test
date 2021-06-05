import {
  Actor,
  Body,
  Collider,
  Color,
  DisplayMode,
  Engine,
  Shape,
} from "excalibur";
import { io } from "socket.io-client";

const socket = io();

socket.on('disconnect', function() {
  location.reload();
});

const engine = new Engine({
  backgroundColor: Color.Black,
  displayMode: DisplayMode.FullScreen,
});

const square = new Actor({
  x: engine.halfDrawWidth,
  y: engine.halfDrawHeight,
  color: Color.White,
  body: new Body({
    collider: new Collider({
      shape: Shape.Box(engine.halfDrawWidth / 10, engine.halfDrawHeight / 10),
    }),
  }),
});

engine.add(square);

engine.start();
