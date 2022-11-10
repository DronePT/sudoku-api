type Grid = number[][];

export class Sudoku {
  private _initialGrid: Grid;

  constructor(private readonly _grid: Grid) {
    this._initialGrid = _grid;
  }

  get initialGrid(): Grid {
    return this._initialGrid;
  }

  get gridSize(): number {
    return this._grid.length;
  }

  get grid(): Grid {
    return this._grid;
  }

  private isValid(row: number, col: number, number: number): boolean {
    const { gridSize } = this;

    // Check row
    for (let i = 0; i < gridSize; i++) {
      if (this._grid[row][i] === number) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < gridSize; i++) {
      if (this._grid[i][col] === number) {
        return false;
      }
    }

    // Check box (3x3) - this is the trickiest part of the algorithm because we need to
    //  find the top left corner of the box that the cell is in and then iterate over
    // the 3x3 box from there to check if the number is already in the box or not.
    const boxSize = Math.sqrt(gridSize);
    const boxRow = Math.floor(row / boxSize);
    const boxCol = Math.floor(col / boxSize);
    for (let i = boxRow * boxSize; i < boxRow * boxSize + boxSize; i++) {
      for (let j = boxCol * boxSize; j < boxCol * boxSize + boxSize; j++) {
        if (this._grid[i][j] === number) {
          return false;
        }
      }
    }

    return true;
  }

  private findEmptyCell(): [number, number] | false {
    const { gridSize } = this;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (this._grid[row][col] === 0) {
          return [row, col];
        }
      }
    }

    return false;
  }

  solve(): Grid | false {
    const emptyCell = this.findEmptyCell();

    if (emptyCell === false) {
      return this._grid;
    }

    const [row, col] = emptyCell;

    for (let number = 1; number <= this.gridSize; number++) {
      if (this.isValid(row, col, number)) {
        this._grid[row][col] = number;

        if (this.solve()) {
          return this._grid;
        }

        this._grid[row][col] = 0;
      }
    }

    return false;
  }

  toString(): string {
    return this._grid
      .map((row) => row.map((cell) => (cell === 0 ? '.' : cell)).join(''))
      .join('');
  }

  print(): void {
    console.log(
      this._grid
        .map((row) => row.map((cell) => (cell === 0 ? '.' : cell)).join(' '))
        .join('\n'),
    );
  }

  copy(): Sudoku {
    return new Sudoku(this._grid.map((row) => [...row]));
  }

  static fromString(sudokuString: string): Sudoku {
    const gridSize = Math.floor(Math.sqrt(sudokuString.length));

    if (gridSize * gridSize !== sudokuString.length) {
      throw new Error('Invalid sudoku string');
    }

    const grid: Grid = [];
    for (let i = 0; i < gridSize; i++) {
      grid.push([]);
      for (let j = 0; j < gridSize; j++) {
        const char = sudokuString[i * gridSize + j];
        grid[i].push(char === '.' ? 0 : parseInt(char, 10));
      }
    }

    return new Sudoku(grid);
  }
}
