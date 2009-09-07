package com.isolace.sudoku.server.test;

import static org.testng.Assert.assertNotNull;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;
import com.isolace.sudoku.server.PuzzleDaoFile;

public class PuzzleTest {
    
    private PuzzleDao puzzleDao;
    
    /**
     * Setup method which will be executed before each test method.
     */
    @BeforeMethod
    public void setUp() {
        this.puzzleDao = new PuzzleDaoFile("puzzles.txt");
    }

    @Test
    public void testJSON() {
        Puzzle p = this.puzzleDao.get(0, 0);
        assertNotNull(Puzzle.toJSON(p));
    }
}
