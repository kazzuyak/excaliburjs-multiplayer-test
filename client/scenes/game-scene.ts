import { Engine, Scene, Input } from "excalibur";
import { GameState } from "../../shared/contracts/game-state";
import { Grid } from "../actors/grid";
import { ScreenInformation } from "../entities/screen-information";
import { Button } from "../html-ui/button";
import { HtmlInput } from "../html-ui/html-input";
import { SocketClient } from "../socket-client";

export class GameScene extends Scene {
  private readonly grid = new Grid();
  private nameInput!: HtmlInput;
  private playButton!: Button;
  private playerNickname?: string;

  public constructor(
    engine: Engine,
    public readonly socketClient: SocketClient,
  ) {
    super(engine);
  }

  public onInitialize(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.grid.init(this, screen);
    this.nameInput = new HtmlInput(this.nameInputOptions(screen));
    this.playButton = new Button(this.playButtonOptions(screen));
  }

  public receiveUpdate(data: GameState) {
    this.grid.update(data);
  }

  public onDeath() {
    this.playButton.options.text = "Play Again";
    this.playButton.show();
  }

  public onDeactivate() {
    this.grid.remove(this);
    this.playButton.remove();
  }

  private nameInputOptions(screen: ScreenInformation) {
    return {
      borderWidth: screen.screenSize * 0.003,
      fontSize: screen.screenSize * 0.06,
      height: screen.screenSize * 0.1,
      width: screen.screenSize * 0.8,
      x: screen.startingX + screen.screenSize * 0.1,
      y: screen.startingY + screen.screenSize * 0.5,
      buttonId: "name-input",
      divId: "name-input-div",
    };
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
        if (this.playerNickname === undefined) {
          const inputElement: { value: string } | null =
            document.getElementById("name-input") as unknown as {
              value: string;
            };

          if (inputElement !== null && inputElement.value.length === 0) {
            return;
          }

          this.playerNickname = inputElement?.value;
        }

        this.socketClient.joinGame.bind(this.socketClient)(this.playerNickname);
        this.playButton.hide();
        this.nameInput.hide();
      },
    };
  }
}
