import { Sudoku } from './sudoku';

describe('Sudoku', () => {
  describe('serialize and deserialize a sudoku', () => {
    it('should create a Sudoku from a string', () => {
      const sudoku = Sudoku.fromString('123456789');
      expect(sudoku.grid).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      const sudoku2 = Sudoku.fromString(
        '.1...8...3.472169...6....1....9.253..421.378..358.6....9....1...213874.9...5...2.',
      );

      expect(sudoku2.grid).toEqual([
        [0, 1, 0, 0, 0, 8, 0, 0, 0],
        [3, 0, 4, 7, 2, 1, 6, 9, 0],
        [0, 0, 6, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 9, 0, 2, 5, 3, 0],
        [0, 4, 2, 1, 0, 3, 7, 8, 0],
        [0, 3, 5, 8, 0, 6, 0, 0, 0],
        [0, 9, 0, 0, 0, 0, 1, 0, 0],
        [0, 2, 1, 3, 8, 7, 4, 0, 9],
        [0, 0, 0, 5, 0, 0, 0, 2, 0],
      ]);
    });

    it('should serialize a Sudoku to a string', () => {
      const sudoku = new Sudoku([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);

      expect(sudoku.toString()).toEqual('123456789');

      const sudoku2 = new Sudoku([
        [0, 1, 0, 0, 0, 8, 0, 0, 0],
        [3, 0, 4, 7, 2, 1, 6, 9, 0],
        [0, 0, 6, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 9, 0, 2, 5, 3, 0],
        [0, 4, 2, 1, 0, 3, 7, 8, 0],
        [0, 3, 5, 8, 0, 6, 0, 0, 0],
        [0, 9, 0, 0, 0, 0, 1, 0, 0],
        [0, 2, 1, 3, 8, 7, 4, 0, 9],
        [0, 0, 0, 5, 0, 0, 0, 2, 0],
      ]);

      expect(sudoku2.toString()).toEqual(
        '.1...8...3.472169...6....1....9.253..421.378..358.6....9....1...213874.9...5...2.',
      );
    });

    it('should throw an error if the string is invalid', () => {
      expect(() => Sudoku.fromString('12345678')).toThrowError(
        'Invalid sudoku string',
      );
    });
  });

  describe('solve', () => {
    it('returns an empty grid when given an empty grid', () => {
      const sudoku = new Sudoku([]);
      expect(sudoku.solve()).toEqual([]);
    });

    it('correctly solves a 9x9 Sudoku grid', () => {
      const sudoku = Sudoku.fromString(
        '9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7254',
      );

      sudoku.solve();

      expect(sudoku.toString()).toEqual(
        '971536842286974513354812679563421798497658321128793465732145986645289137819367254',
      );
    });

    it('correctly solves a 4x4 Sudoku grid', () => {
      const sudoku = Sudoku.fromString('.43............1');

      sudoku.solve();

      expect(sudoku.toString()).toEqual('1432231441233241');
    });

    it('should not be able to solve an invalid Sudoku grid', () => {
      const sudoku = Sudoku.fromString(
        '9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7253',
      );

      expect(sudoku.solve()).toEqual(false);

      const sudoku2 = Sudoku.fromString(
        '937..42...1.825.94..2..6.87...4.27...47...85...15.3...36.2..4..82.147.3...43....8',
      );

      expect(sudoku2.solve()).toEqual(false);
    });
  });
});
