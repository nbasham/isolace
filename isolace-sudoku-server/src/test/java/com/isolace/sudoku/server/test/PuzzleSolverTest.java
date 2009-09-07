package com.isolace.sudoku.server.test;

import static org.testng.Assert.assertTrue;

import org.testng.annotations.Test;

import com.isolace.common.ArrayUtil;
import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;
import com.isolace.sudoku.server.PuzzleDaoFile;
import com.isolace.sudoku.server.PuzzleSolver;

public class PuzzleSolverTest {

    @Test
    public void testSolver() {
        int[] puzzle = { 5, 8, 2, 6, 3, 1, 7, 4, 9, 1, 7, 6, 4, 9, 8, 3, 2, 5, 4, 3, 9, 7, 5, 2, 1, 6, 8, 3, 1, 8, 5, 2, 7, 4, 9, 6, 2, 5, 4, 3, 6, 9, 8, 7, 1, 9, 6, 7, 1, 8, 4, 5, 3, 2, 8, 9, 3, 2, 4, 5, 6, 1, 7, 7, 4, 5, 9, 1, 6, 2, 8, 3, 6, 2, 1, 8, 7, 3, 9, 5, 4 };
        int[] revealed = { 5, 7, 9, 12, 14, 17, 18, 20, 23, 24, 25, 26, 30, 31, 33, 36, 40, 42, 43, 47, 48, 52, 56, 57,
                59, 61, 62, 65, 66, 67, 68, 70, 71, 74, 77 };
        PuzzleDao pd = new PuzzleDaoFile("puzzles.txt");
        Puzzle p = pd.get(0, 4);
        PuzzleSolver ps = new PuzzleSolver(p.getPuzzle(), p.getRevealed());
        assertTrue(ps.canSolve(System.out));
        Puzzle.printIndexes();
    }
}
