import { CellType } from "./cell-type";
import { Snake } from "./snake";

export class MapServer {
  private readonly mapSize = 20;
  private readonly mapGrid: (CellType | Snake)[][] = [];

  public constructor() {
    for (let rowLine = 0; rowLine < this.mapSize; rowLine++) {
      const row: CellType[] = [];
      for (let colLine = 0; colLine < this.mapSize; colLine++) {
        row.push(CellType.empty);
      }
      this.mapGrid.push(row);
    }
  }
}
