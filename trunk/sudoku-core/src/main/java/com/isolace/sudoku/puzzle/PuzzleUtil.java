package com.isolace.sudoku.puzzle;

import java.util.Arrays;


/**
 * Static utility classes for puzzles.
 *
 */
public class PuzzleUtil
{
	public static final int GRID_SIZE = 9;
	public static final int SOLUTION_SIZE = GRID_SIZE * GRID_SIZE;
	public static final int PROBLEM_SIZE = GRID_SIZE * GRID_SIZE;

	public static final void printAsPuzzle(final String solution)
    {
	    int index = 0;
		for(int r = 0; r < 9; r++)
		{
			for(int c = 0; c < 9; c++)
			{
				System.out.print(solution.charAt(index));
				index++;
				if(c % 3 == 2)
					System.out.print(" ");
			}
			System.out.println();
			if(r % 3 == 2)
				System.out.println();
		}
    }
	public static final int getRowFromIndex(final int index)
	{
		int i = index / 9;

		return i;
	}
	public static final int getColFromIndex(final int index)
	{
		int i = index % 9;

		return i;
	}
	public static final int getGridFromIndex(final int index)
	{
		int i = (getRowFromIndex(index) / 3) * 3 + getColFromIndex(index) / 3;

		return i;
	}
	public static final boolean inGrid(final int index, final int guess, final String board)
	{
		int currGrid = getGridFromIndex(index);
		for(int i = 0; i < 81; i++)
		{
			int gridIndex = (getRowFromIndex(i) / 3) * 3 + getColFromIndex(i) / 3;
			if(gridIndex == currGrid)
				if(guess == board.charAt(i) - '0')
					return true;
		}

		return false;
	}
	public static final boolean inRow(final int index, final int guess, final String board)
	{
		int row = getRowFromIndex(index);
		for(int i = row*9; i < (row+1)*9; i++)
		{
			if(guess == board.charAt(i) - '0')
				return true;
		}

		return false;
	}
	public static final boolean inCol(final int index, final int guess, final String board)
	{
		int col = getColFromIndex(index);
		for(int i = col; i < 81; i +=9)
		{
			if(guess == board.charAt(i) - '0')
				return true;
		}

		return false;
	}
	public static final boolean validGuess(final int index, final int guess, final String board)
	{
		return !PuzzleUtil.inRow(index, guess, board) && !PuzzleUtil.inCol(index, guess, board) && !PuzzleUtil.inGrid(index, guess, board);
	}
	/**
	 * Given a String of 81 chars representing a solution, return a 9x9 int
	 * array
	 */
	public static final int[][]solutionMatrixFromString(String solution)
	{
		if(solution == null)
			throw new NullPointerException("Solution is null");
		if(solution.length() != SOLUTION_SIZE)
			throw new ArrayIndexOutOfBoundsException("Solution length must be " + (SOLUTION_SIZE) + " but was " + solution.length());
		int[][] solutionMatrix = new int[GRID_SIZE][GRID_SIZE];
		int index = 0;
		for (int row = 0; row < solutionMatrix.length; row++)
        {
			for (int col = 0; col < solutionMatrix.length; col++)
	        {
				solutionMatrix[row][col] = solution.charAt(index++) - '0';
	        }
        }
		
		return solutionMatrix;
	}

	/**
	 * Given an a 9 x 9 array of ints return an 81 char String
	 */
	public static final String solutionMatrixToString(int[][] solutionMatrix)
	{
		StringBuilder sb = new StringBuilder();
		for (int row = 0; row < solutionMatrix.length; row++)
        {
			int[] currRow = solutionMatrix[row];
			for (int col = 0; col < currRow.length; col++)
	        {
				sb.append(solutionMatrix[row][col]);
	        }
        }
		
		return sb.toString();
	}

//    public static final boolean validGuess(int i, int j, int guess, int[][] cells) {
//        for (int k = 0; k < 9; ++k)  // row
//            if (guess == cells[k][j])
//                return false;
//
//        for (int k = 0; k < 9; ++k) // col
//            if (guess == cells[i][k])
//                return false;
//
//        int boxRowOffset = (i / 3)*3;
//        int boxColOffset = (j / 3)*3;
//        for (int k = 0; k < 3; ++k) // box
//            for (int m = 0; m < 3; ++m)
//                if (guess == cells[boxRowOffset+k][boxColOffset+m])
//                    return false;
//
//        return true; // no violations, so it's legal
//    }

    /**
     * Test to make sure the solution string is valid for the problem
     * @throws NullPointerException is the solution or problem is null
     * @throws ArrayIndexOutOfBoundsException is the solution or problem is the wrong length
     * @throws IllegalArgumentException is the solution value doesn't equal problem value
     */
    public static final void validateSolution(final String solution, final String problem) {
		if(solution == null)
			throw new NullPointerException("Solution is null");
		if(problem == null)
			throw new NullPointerException("Solution is null");
		if(solution.length() != SOLUTION_SIZE)
			throw new ArrayIndexOutOfBoundsException("Solution length must be " + (SOLUTION_SIZE) + " but was " + solution.length());
		if(problem.length() != PROBLEM_SIZE)
			throw new ArrayIndexOutOfBoundsException("Problem length must be " + (PROBLEM_SIZE) + " but was " + problem.length());
		for (int i = 0; i < SOLUTION_SIZE; i++)
        {
			int problemValue = problem.charAt(i) - '0';
			int solutionValue = solution.charAt(i) - '0';
			if((problemValue != 0) && (solutionValue != problemValue))
        		throw new IllegalArgumentException("Problem value " + problemValue + " at index=" + i + " is not equal to solution value " + solutionValue);
        }
    }

    /**
     * Test to make sure the solution matrix is valid for the problem
     * @throws IllegalArgumentException is the solution value doesn't equal problem value
     */
    public static final void validateSolutionMatrix(final int[][] solutionMatrix) {
		if(solutionMatrix == null)
			throw new NullPointerException("Solution is null");
		if(solutionMatrix.length != 9)
    		throw new IllegalArgumentException("Solution must have 9 rows, but has " + solutionMatrix.length);
		for (int row = 0; row < solutionMatrix.length; row++)
        {
			int[] currRow = solutionMatrix[row];
			uniqueInRow(solutionMatrix, row);
			uniqueInGrid(solutionMatrix, row);
			for (int col = 0; col < currRow.length; col++)
	        {
				uniqueInCol(solutionMatrix, col);
	        }
        }
    }

    private static final boolean uniqueInRow(int[][] solutionMatrix, int rowIndex) {
    	int[] row = new int[GRID_SIZE];
    	for(int i = 0; i < GRID_SIZE; i++)
    	{
    		int rowValue = solutionMatrix[rowIndex][i] - 1;
    		if(row[rowValue] == 0)
    			row[rowValue] = rowValue;
    		else
        		throw new IllegalArgumentException("Row values must be unique, rowIndex=" + rowIndex + " is not");
    	}

    	return true;
    }

    private static final boolean uniqueInCol(final int[][] solutionMatrix, final int colIndex) {
    	int[] col = new int[GRID_SIZE];
    	for(int i = 0; i < GRID_SIZE; i++)
    	{
    		int colValue = solutionMatrix[i][colIndex] - 1;
    		if(col[colValue] == 0)
        		col[colValue] = colValue;
    		else
        		throw new IllegalArgumentException("Column values must be unique, colIndex=" + colIndex + " is not");
    	}

    	return true;
    }

    private static final boolean uniqueInGrid(final int[][] solutionMatrix, final int gridIndex) {
    	int[] gridArray = getGrid(solutionMatrix, gridIndex);
		
    	int[] grid = new int[GRID_SIZE];
    	for(int j = 0; j < GRID_SIZE; j++)
    	{
    		int gridValue = gridArray[j] - 1;
    		if(grid[gridValue] == 0)
    			grid[gridValue] = gridValue;
    		else
        		throw new IllegalArgumentException("Grid values must be unique, gridIndex=" + gridIndex + " is not " + Arrays.toString(gridArray) + ".");
    	}

    	return true;
    }

	private static int[] getGrid(final int[][] solutionMatrix, final int gridIndex)
    {
	    final int startRow = gridIndexToRow(gridIndex);
    	final int startCol = gridIndexToCol(gridIndex);
    	int[] row = new int[GRID_SIZE];
    	int i = 0;
		for (int r = startRow; r < startRow + 3; r++)
        {
			for (int c = startCol; c < startCol + 3; c++)
	        {
				row[i++] = solutionMatrix[r][c];
	        }
        }
	    return row;
    }

	private static int gridIndexToCol(final int gridIndex)
    {
	    final int startCol = (gridIndex % 3) * 3;
	    return startCol;
    }

	private static int gridIndexToRow(final int gridIndex)
    {
	    final int startRow = (gridIndex / 3) * 3;
	    return startRow;
    }
}
