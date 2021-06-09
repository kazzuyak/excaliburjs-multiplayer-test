import { Engine, Scene, Input } from "excalibur";
import { GameState } from "../../shared/contracts/game-state";
import { Grid } from "../actors/grid";
import { ScreenInformation } from "../entities/screen-information";
import { Button } from "../html-ui/button";
import { SocketClient } from "../socket-client";

export class GameScene extends Scene {
  private readonly grid = new Grid();
  private playButton!: Button;

  public constructor(
    engine: Engine,
    public readonly socketClient: SocketClient,
  ) {
    super(engine);
  }

  public onInitialize(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.grid.init(this, screen);
    this.playButton = new Button(this.playButtonOptions(screen));
  }

  public receiveUpdate(data: GameState) {
    this.grid.update(data);
  }

  public onDeath() {
    this.playButton.options.text = "Play Again"
    this.playButton.show();
  }

  public onDeactivate() {
    this.grid.remove(this);
    this.playButton.remove();
  }

  private playButtonOptions(screen: ScreenInformation) {
    return {
      borderWidth: screen.screenSize * 0.003,
      fontSize: screen.screenSize * 0.06,
      height: screen.screenSize * 0.1,
      width: screen.screenSize * 0.8,
      x: screen.startingX + screen.screenSize * 0.1,
      y: screen.startingY + screen.screenSize * 0.65,
      text: "Play",
      buttonId: "play-button",
      divId: "play-button-div",
      onClick: () => {
        this.socketClient.joinGame.bind(this.socketClient)();
        this.playButton.hide()
      }
    };
  }
}
