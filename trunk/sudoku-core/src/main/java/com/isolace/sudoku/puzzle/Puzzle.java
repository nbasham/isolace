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

    private static final int EASY_PUZZLE_NUM_CLUES = 35;
    private static final int MEDIUM_PUZZLE_NUM_CLUES = 30;
    private static final int HARD_PUZZLE_NUM_CLUES = 27;
    private static final int CHALLENGE_PUZZLE_NUM_CLUES = 24;

    private long index;
    private String problem;
    private String solution;
    private int level;

    public Puzzle(int level, long index, String solution, String problem) {
        super();
        this.level = level;
        this.index = index;
        this.solution = solution;
        this.problem = problem;
    }

    /**
     * Get the <code>Puzzle</code>'s unique index.
     */
    public long getIndex() {
        return index;
    }

    /**
     * Get the <code>Puzzle</code>'s problem. This is an 81 char String that
     * uses 0 to denote cells the user must guess.
     */
    public String getProblem() {
        return problem;
    }

    /**
     * Get the <code>Puzzle</code>'s solution. This is an 81 char String that
     * contains 1 to 9 in each cell.
     */
    public String getSolution() {
        return solution;
    }

    /**
     * Get the level of the <code>Puzzle</code> i.e. EASY, MEDIUM, HARD
     */
    public int getLevel() {
        return level;
    }

    public static final int getNumHintsForLevel(final int level) {
        switch (level) {
        case Puzzle.EASY_LEVEL:
            return Puzzle.EASY_PUZZLE_NUM_CLUES;
        case Puzzle.MEDIUM_LEVEL:
            return Puzzle.MEDIUM_PUZZLE_NUM_CLUES;
        case Puzzle.HARD_LEVEL:
            return Puzzle.HARD_PUZZLE_NUM_CLUES;
        case Puzzle.CHALLENGE_LEVEL:
            return Puzzle.CHALLENGE_PUZZLE_NUM_CLUES;
        default:
            throw new IllegalArgumentException("Invalid level.");
        }
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
