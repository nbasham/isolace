package com.isolace.sudoku.puzzle.test;

import static org.testng.AssertJUnit.assertEquals;
import static org.testng.AssertJUnit.assertFalse;
import static org.testng.AssertJUnit.assertTrue;

import org.testng.annotations.Test;

import com.isolace.sudoku.puzzle.PuzzleUtil;

public class PuzzleUtilTest
{
	private static final String VALID_SOLUTION = 		"864531297951627843273489615147956382396248571582173964625814739719365428438792156";
	private static final String VALID_PUZZLE_PROBLEM =	"000031000001620003003089600040056380000248000082173004625000009719365000438792000";

	@Test
	final public void testSolutionMatrixToString() throws Exception
	{
		int[][] solutionMatrix = new int[PuzzleUtil.GRID_SIZE][PuzzleUtil.GRID_SIZE];
		String puzzle = PuzzleUtil.solutionMatrixToString(solutionMatrix);
        assertEquals(PuzzleUtil.GRID_SIZE*PuzzleUtil.GRID_SIZE, puzzle.length());
	}
	@Test
    final public void testSolutionMatrixFromString() throws Exception
    {
		int[][] matrix = PuzzleUtil.solutionMatrixFromString(VALID_SOLUTION);
		assertEquals(PuzzleUtil.GRID_SIZE, matrix.length);
    }
	@Test(expectedExceptions=ArrayIndexOutOfBoundsException.class)
    final public void testMatrixFromStringLengthException() throws Exception
    {
	    PuzzleUtil.solutionMatrixFromString("0,3");
    }
	@Test(expectedExceptions=NullPointerException.class)
    final public void testMatrixFromStringNullPuzzle() throws Exception
    {
	    PuzzleUtil.solutionMatrixFromString(null);
    }
	@Test
    final public void testValidateSolutionMatrix() throws Exception
    {
		int[][] solutionMatrix = PuzzleUtil.solutionMatrixFromString(VALID_SOLUTION);
		PuzzleUtil.validateSolutionMatrix(solutionMatrix);
    }
	@Test(expectedExceptions=NullPointerException.class)
    final public void testValidateNullSolutionMatrix() throws Exception
    {
	    PuzzleUtil.validateSolutionMatrix(null);
    }
	@Test(expectedExceptions=IllegalArgumentException.class)
    final public void testValidatePuzzleNonUnique() throws Exception
    {
		int[][] solutionMatrix = PuzzleUtil.solutionMatrixFromString(VALID_SOLUTION);
		solutionMatrix[0][0] = 9;
		PuzzleUtil.validateSolutionMatrix(solutionMatrix);
    }
	@Test
    final public void testValidateSolution() throws Exception
    {
	    PuzzleUtil.validateSolution(VALID_SOLUTION, VALID_PUZZLE_PROBLEM);
    }
	@Test(expectedExceptions=NullPointerException.class)
    final public void testValidateSolutionNullSolution() throws Exception
    {
	    PuzzleUtil.validateSolution(null, VALID_PUZZLE_PROBLEM);
    }
	@Test(expectedExceptions=NullPointerException.class)
    final public void testValidateSolutionNullProblem() throws Exception
    {
	    PuzzleUtil.validateSolution(VALID_SOLUTION, null);
    }
//	@Test
//    final public void testPrint() throws Exception
//    {
//		PuzzleUtil.printAsPuzzle(VALID_SOLUTION);
//    }
	@Test
    final public void testInGrid0() throws Exception
    {
		boolean inGrid = PuzzleUtil.inGrid(12, 3, VALID_PUZZLE_PROBLEM);
		assertTrue(inGrid);
    }
	@Test
    final public void testNotInGrid0() throws Exception
    {
		boolean inGrid = PuzzleUtil.inGrid(12, 4, VALID_PUZZLE_PROBLEM);
		assertFalse(inGrid);
    }
	@Test
    final public void testInGrid4() throws Exception
    {
		boolean inGrid = PuzzleUtil.inGrid(43, 8, VALID_PUZZLE_PROBLEM);
		assertTrue(inGrid);
    }
	@Test
    final public void testNotInGrid4() throws Exception
    {
		boolean inGrid = PuzzleUtil.inGrid(42, 9, VALID_PUZZLE_PROBLEM);
		assertFalse(inGrid);
    }
	@Test
    final public void testInGrid8() throws Exception
    {
		boolean inGrid = PuzzleUtil.inGrid(79, 9, VALID_PUZZLE_PROBLEM);
		assertTrue(inGrid);
    }
	@Test
    final public void testNotInGrid8() throws Exception
    {
		boolean inGrid = PuzzleUtil.inGrid(80, 2, VALID_PUZZLE_PROBLEM);
		assertFalse(inGrid);
    }

	@Test
    final public void testInRow0() throws Exception
    {
		boolean inRow = PuzzleUtil.inRow(12, 3, VALID_PUZZLE_PROBLEM);
		assertTrue(inRow);
    }
	@Test
    final public void testNotInRow0() throws Exception
    {
		boolean inRow = PuzzleUtil.inRow(12, 4, VALID_PUZZLE_PROBLEM);
		assertFalse(inRow);
    }
	@Test
    final public void testInRow4() throws Exception
    {
		boolean inRow = PuzzleUtil.inRow(43, 8, VALID_PUZZLE_PROBLEM);
		assertTrue(inRow);
    }
	@Test
    final public void testNotInRow4() throws Exception
    {
		boolean inRow = PuzzleUtil.inRow(42, 9, VALID_PUZZLE_PROBLEM);
		assertFalse(inRow);
    }
	@Test
    final public void testInRow8() throws Exception
    {
		boolean inRow = PuzzleUtil.inRow(79, 9, VALID_PUZZLE_PROBLEM);
		assertTrue(inRow);
    }
	@Test
    final public void testNotInRow8() throws Exception
    {
		boolean inRow = PuzzleUtil.inRow(80, 1, VALID_PUZZLE_PROBLEM);
		assertFalse(inRow);
    }

	@Test
    final public void testInCol0() throws Exception
    {
		boolean inCol = PuzzleUtil.inCol(9, 6, VALID_PUZZLE_PROBLEM);
		assertTrue(inCol);
    }
	@Test
    final public void testNotInCol0() throws Exception
    {
		boolean inCol = PuzzleUtil.inCol(9, 2, VALID_PUZZLE_PROBLEM);
		assertFalse(inCol);
    }
	@Test
    final public void testInCol4() throws Exception
    {
		boolean inCol = PuzzleUtil.inCol(31, 8, VALID_PUZZLE_PROBLEM);
		assertTrue(inCol);
    }
	@Test
    final public void testNotInCol4() throws Exception
    {
		boolean inCol = PuzzleUtil.inCol(40, 1, VALID_PUZZLE_PROBLEM);
		assertFalse(inCol);
    }
	@Test
    final public void testInCol8() throws Exception
    {
		boolean inCol = PuzzleUtil.inCol(8, 9, VALID_PUZZLE_PROBLEM);
		assertTrue(inCol);
    }
	@Test
    final public void testNotInCol8() throws Exception
    {
		boolean inCol = PuzzleUtil.inCol(80, 1, VALID_PUZZLE_PROBLEM);
		assertFalse(inCol);
    }

	@Test
    final public void testValidGuess9() throws Exception
    {
		boolean inCol = PuzzleUtil.validGuess(9, 5, VALID_PUZZLE_PROBLEM);
		assertTrue(inCol);
    }
	@Test
    final public void testNotValidGuess9() throws Exception
    {
		boolean inCol = PuzzleUtil.validGuess(9, 6, VALID_PUZZLE_PROBLEM);
		assertFalse(inCol);
    }
	@Test
    final public void testValidGuess42() throws Exception
    {
		boolean inCol = PuzzleUtil.validGuess(42, 1, VALID_PUZZLE_PROBLEM);
		assertTrue(inCol);
    }
	@Test
    final public void testNotValidGuess40() throws Exception
    {
		boolean inCol = PuzzleUtil.validGuess(40, 8, VALID_PUZZLE_PROBLEM);
		assertFalse(inCol);
    }
	@Test
    final public void testValidGuess62() throws Exception
    {
		boolean inCol = PuzzleUtil.validGuess(62, 1, VALID_PUZZLE_PROBLEM);
		assertTrue(inCol);
    }
	@Test
    final public void testNotValidGuess62() throws Exception
    {
		boolean inCol = PuzzleUtil.validGuess(62, 4, VALID_PUZZLE_PROBLEM);
		assertFalse(inCol);
    }
}


