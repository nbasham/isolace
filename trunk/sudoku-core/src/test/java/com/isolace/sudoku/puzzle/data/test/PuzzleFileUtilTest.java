package com.isolace.sudoku.puzzle.data.test;

import java.util.List;

import static org.testng.Assert.assertTrue;
import org.testng.annotations.Test;

import com.isolace.sudoku.puzzle.Puzzle;
import com.isolace.sudoku.puzzle.data.PuzzleFileUtil;


public class PuzzleFileUtilTest {
    
    private static final String PUZZLE_DATA_PATH = "/Users/iSolace/Documents/dev/workspace/sudoku-core/data/20090430-1000";

    @Test
    public void testReadPuzzlesFromFiles() throws Exception {
        List<List<Puzzle>> puzzleLists = PuzzleFileUtil.readPuzzlesFromFiles(PUZZLE_DATA_PATH);
        assertTrue((Puzzle.CHALLENGE_LEVEL + 1) == puzzleLists.size());
    }
}
