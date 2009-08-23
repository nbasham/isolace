package com.isolace.sudoku.server.test;

import static org.testng.Assert.assertTrue;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;
import com.isolace.sudoku.server.PuzzleDaoFile;
import com.isolace.sudoku.server.PuzzleGeneration;

public class PuzzleDaoTest {

    private PuzzleDao puzzleDao;
    /**
     * Setup method which will be executed before each test method.
     */
    @BeforeMethod
    public void setUp() {
        this.puzzleDao = new PuzzleDaoFile("puzzles-100x4.txt");
    }

    /**
     * Tests to make sure all of the puzzles returned by PuzzleDao are valid.
     */
    @Test
    public void testPuzzleDao() {
        int index = 0;
        for (int level = Puzzle.EASY_LEVEL; level <= Puzzle.CHALLENGE_LEVEL; level++) {
            int numPuzzles = this.puzzleDao.getNumPuzzles(level);
            for (int i = 0; i < numPuzzles; i++) {
                Puzzle p = this.puzzleDao.get(level, i);
                boolean b = PuzzleGeneration.validPuzzle(p.getPuzzle());
                assertTrue(b);
                index++;
            }
        }
        System.out.println("Tested " + index + " puzzles.");
    }
}
