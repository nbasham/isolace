package com.isolace.sudoku.server.test;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

import org.testng.annotations.Test;

import com.isolace.sudoku.server.PuzzleGeneration;

public class PuzzleGenerationTest {

    /**
     * 1 is unique in grid: 264981573
     * <pre>
     * 264 981 573 
     * 513 427 869 
     * 129 743 658
     * </pre>
     */
    @Test
    public void testValidGridCandidate() {
        int[] puzzle = {2,6,4,9,8,1,5,7,3,5,1,3,4,2,7,8,6,9};
        assertTrue(PuzzleGeneration.validGridCandidate(puzzle, 10, 1));
    }

    /**
     * 2 is not unique in grid: 264981573
     * <pre>
     * 264 981 573 
     * 513 427 869 
     * 129 743 658
     * </pre>
     */
    @Test
    public void testValidGridCandidateFail() {
        int[] puzzle = {2,6,4,9,8,1,5,7,3,5,1,3,4,2,7,8,6,9,1};
        assertFalse(PuzzleGeneration.validGridCandidate(puzzle, 11, 2));
    }
    
    @Test
    public void testValidPuzzle() {
        int[] puzzle = { 7, 2, 3, 9, 6, 1, 5, 4, 8, 8, 1, 4, 5, 3, 2, 6, 9, 7, 9, 5, 6, 8, 4, 7, 1, 2, 3, 1, 6, 9, 3,
                8, 4, 7, 5, 2, 5, 8, 2, 6, 7, 9, 3, 1, 4, 3, 4, 7, 1, 2, 5, 9, 8, 6, 4, 9, 8, 7, 1, 6, 2, 3, 5, 2, 7,
                1, 4, 5, 3, 8, 6, 9, 6, 3, 5, 2, 9, 8, 4, 7, 1 };
        assertTrue(PuzzleGeneration.validPuzzle(puzzle));
    }

    @Test
    public void testInvalidPuzzle() {
        int[] puzzle = { 7, 1, 3, 6, 9, 5, 2, 4, 8, 2, 5, 6, 8, 1, 4, 3, 9, 7, 8, 9, 4, 7, 6, 3, 1, 5, 2, 1, 2, 7, 4,
                3, 6, 9, 8, 5, 3, 8, 9, 5, 2, 7, 4, 6, 1, 4, 6, 5, 1, 8, 9, 7, 2, 3, 9, 3, 1, 2, 5, 8, 6, 7, 4, 5, 7,
                2, 9, 4, 1, 8, 3, 6, 6, 4, 8, 3, 7, 2, 5, 1, 9 };
        assertFalse(PuzzleGeneration.validPuzzle(puzzle));
    }
}
