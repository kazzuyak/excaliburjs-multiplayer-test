import { Engine, Scene, Input } from "excalibur";
import { Grid } from "../actors/grid";
import { ScreenInformation } from "../entities/screen-information";
import { SocketClient } from "../socket-client";

export class GameScene extends Scene {
  private readonly grid = new Grid();

  public constructor(engine: Engine, public readonly socketClient: SocketClient) {
    super(engine);
  }

  public onInitialize(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.grid.init(this, screen);
  }

  public receiveUpdate(data: {
    players: { x: number; y: number; id: string }[];
  }) {
    this.grid.update(data.players);
  }

  public onDeactivate() {
    this.grid.remove(this);
  }
}
