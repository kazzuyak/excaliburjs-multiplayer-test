import { Engine, Scene, Input } from "excalibur";
import { GameState } from "../../shared/contracts/game-state";
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

  public receiveUpdate(data: GameState) {
    this.grid.update(data);
  }

  public onDeactivate() {
    this.grid.remove(this);
  }
}
