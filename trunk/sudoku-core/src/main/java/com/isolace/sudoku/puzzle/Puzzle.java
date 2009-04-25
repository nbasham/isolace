package com.isolace.sudoku.puzzle;

/**
 * A simple bean for holding the state of a single puzzle, including its unique
 * id, level, solution and problem.
 * 
 */
public class Puzzle {

    public static final int EASY_LEVEL = 0;
    public static final int MEDIUM_LEVEL = 1;
    public static final int HARD_LEVEL = 2;
    public static final int CHALLENGE_LEVEL = 3;

    private long id;
    private String problem;
    private String solution;
    private int level;

    /**
     * Get the <code>Puzzle</code>'s unique id.
     */
    public long getId() {
        return id;
    }

    /**
     * Set the <code>Puzzle</code>'s unique id.
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Get the <code>Puzzle</code>'s problem. This is an 81 char String that
     * uses 0 to denote cells the user must guess.
     */
    public String getProblem() {
        return problem;
    }

    /**
     * Set the <code>Puzzle</code>'s problem. This is an 81 char String that
     * uses 0 to denote cells the user must guess.
     */
    public void setProblem(String problem) {
        this.problem = problem;
    }

    /**
     * Get the <code>Puzzle</code>'s solution. This is an 81 char String that
     * contains 1 to 9 in each cell.
     */
    public String getSolution() {
        return solution;
    }

    /**
     * Set the <code>Puzzle</code>'s solution. This is an 81 char String that
     * contains 1 to 9 in each cell.
     */
    public void setSolution(String solution) {
        this.solution = solution;
    }

    /**
     * Get the level of the <code>Puzzle</code> i.e. EASY, MEDIUM, HARD
     */
    public int getLevel() {
        return level;
    }

    /**
     * Set the level of the <code>Puzzle</code> i.e. EASY, MEDIUM, HARD
     */
    public void setLevel(int level) {
        this.level = level;
    }

    public static final String puzzleLevelToString(final int puzzleLevel) {
        String s = null;
        switch (puzzleLevel) {
        case Puzzle.EASY_LEVEL:
            s = "easy";
            break;
        case Puzzle.MEDIUM_LEVEL:
            s = "medium";
            break;
        case Puzzle.HARD_LEVEL:
            s = "hard";
            break;
        case Puzzle.CHALLENGE_LEVEL:
            s = "challenger";
            break;
        }
        if (s == null)
            throw new IllegalArgumentException("Puzzle level " + puzzleLevel + " is not defined.");

        return s;
    }
}
