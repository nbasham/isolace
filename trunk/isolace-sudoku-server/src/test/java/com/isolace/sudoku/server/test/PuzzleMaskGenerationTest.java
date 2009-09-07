package com.isolace.sudoku.server.test;

import static org.testng.Assert.assertTrue;

import org.testng.annotations.Test;

import com.isolace.common.ArrayUtil;
import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleMaskGeneration;

public class PuzzleMaskGenerationTest {

    @Test
    public void testValidPuzzleDao() {
        int[] puzzle = {2,6,5,3,9,4,1,8,7,7,8,4,5,6,1,9,3,2,3,9,1,7,8,2,5,6,4,1,2,8,6,3,7,4,9,5,9,4,3,8,2,5,7,1,6,5,7,6,1,4,9,3,2,8,8,1,9,4,7,6,2,5,3,6,5,7,2,1,3,8,4,9,4,3,2,9,5,8,6,7,1};
        int[] ambigies = PuzzleMaskGeneration.getAmbiguousIndexes(puzzle);
        ArrayUtil.printArray(ambigies);
        Puzzle.printIndexes();
        Puzzle.printAsPuzzle(puzzle);
        assertTrue(true);
    }

}
