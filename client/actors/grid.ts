import { Scene, Vector } from "excalibur";
import { GameState } from "../../shared/contracts/game-state";
import { ScreenInformation } from "../entities/screen-information";
import { GridCell } from "./grid-cell";
import { GridLine } from "./grid-line";
import { LabelCell } from "./label-cell";

export class Grid {
  private verticalLines: GridLine[] = [];
  private horizontalLines: GridLine[] = [];
  private cells: GridCell[][] = [];
  private labelCells: LabelCell[][] = [];
  private readonly gridSize = 20;

  public init(scene: Scene, screen: ScreenInformation) {
    const cellSize = screen.screenSize / this.gridSize;

    for (let line = 0; line < this.gridSize + 1; line++) {
      this.verticalLines.push(
        new GridLine({
          height: screen.screenSize,
          width: screen.screenSize / 500,
          x: screen.startingX + line * cellSize,
          y: screen.halfY,
        }),
      );
      this.horizontalLines.push(
        new GridLine({
          width: screen.screenSize,
          height: screen.screenSize / 500,
          x: screen.halfX,
          y: screen.startingY + line * cellSize,
        }),
      );
    }

    for (let rowLine = 0; rowLine < this.gridSize; rowLine++) {
      const row = [];
      const labelRow = [];
      for (let colLine = 0; colLine < this.gridSize; colLine++) {
        const posX = screen.startingX + rowLine * cellSize + cellSize / 2;
        const posY = screen.startingY + colLine * cellSize + cellSize / 2;

        row.push(new GridCell(cellSize, new Vector(posX, posY)));
        labelRow.push(new LabelCell(posX, posY + cellSize / 4, cellSize / 3));
      }
      this.cells.push(row);
      this.labelCells.push(labelRow);
    }

    this.verticalLines.forEach((line) => scene.add(line));
    this.horizontalLines.forEach((line) => scene.add(line));
    this.cells.forEach((row) => {
      row.forEach((cell) => scene.add(cell));
    });
    this.labelCells.forEach((labelRow) => {
      labelRow.forEach((labelCell) => scene.add(labelCell));
    });
  }

  public update(gameState: GameState, scene: Scene) {
    this.cells.forEach((cellRow: GridCell[], rowIndex: number) => {
      cellRow.forEach((cell: GridCell, colIndex: number) => {
        cell.setEmpty();
        this.labelCells[rowIndex][colIndex].text = "";

        for (const player of gameState.players) {
          let posIndex = 0;
          for (const position of player.pos) {
            if (position.x === rowIndex && position.y === colIndex) {
              cell.setSnake();

              if (posIndex === 0) {
                cell.setSnakeHead();
              }

              this.labelCells[rowIndex][colIndex].text =
                player.nickname[posIndex] ?? "";

              if (player.isDead) {
                cell.setDeadSnake();
              }

              return;
            }
            posIndex++;
          }
        }

        for (const food of gameState.foods) {
          if (food.x === rowIndex && food.y === colIndex) {
            cell.setFood();

            return;
          }
        }
      });
    });
  }

  public remove(scene: Scene) {
    this.verticalLines.forEach((line) => scene.remove(line));
    this.horizontalLines.forEach((line) => scene.remove(line));
  }
}
