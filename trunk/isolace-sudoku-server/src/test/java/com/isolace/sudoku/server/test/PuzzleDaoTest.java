package com.isolace.sudoku.server.test;

import static org.testng.Assert.assertTrue;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;
import com.isolace.sudoku.server.PuzzleDaoFile;
import com.isolace.sudoku.server.PuzzleSolver;
import com.isolace.sudoku.server.PuzzleValidation;

public class PuzzleDaoTest {

    private PuzzleDao puzzleDao;
    /**
     * Setup method which will be executed before each test method.
     */
    @BeforeMethod
    public void setUp() {
        this.puzzleDao = new PuzzleDaoFile("puzzles.txt");
    }

    /**
     * Tests to make sure all of the puzzles returned by PuzzleDao are valid.
     */
    @Test
    public void testValidPuzzleDao() {
        int index = 0;
        for (int level = Puzzle.EASY_LEVEL; level <= Puzzle.CHALLENGE_LEVEL; level++) {
            int numPuzzles = this.puzzleDao.getNumPuzzles(level);
            for (int i = 0; i < numPuzzles; i++) {
                Puzzle p = this.puzzleDao.get(level, i);
                boolean b = PuzzleValidation.isValid(p.getPuzzle());
                new PuzzleSolver(p.getPuzzle(), p.getRevealed()).canSolve(null);
                assertTrue(b);
                index++;
            }
        }
        System.out.println("Tested " + index + " puzzles.");
    }

    /**
     * Tests to make sure that lazy puzzle loading occurs if getNumPuzzles is called first..
     */
    @Test
    public void testGetNumPuzzles() {
        PuzzleDao localPuzzleDao = new PuzzleDaoFile("puzzles.txt");
        for (int level = Puzzle.EASY_LEVEL; level <= Puzzle.CHALLENGE_LEVEL; level++) {
            assertTrue(localPuzzleDao.getNumPuzzles(level) > 0);
        }
    }
}
