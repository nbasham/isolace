package com.isolace.sudoku.server;

import java.io.Serializable;

/**
 * A Sudoku puzzle.
 */
public class Puzzle implements Serializable {

    public static final int EASY_LEVEL = 0;
    public static final int MEDIUM_LEVEL = 1;
    public static final int HARD_LEVEL = 2;
    public static final int CHALLENGE_LEVEL = 3;

    private static final long serialVersionUID = 1L;

    private int index;
    private int level;
    private int[] puzzle;
    private int[] revealed;

    /**
     * Puzzle representation of a Sudoku puzzle.
     * @param puzzle Puzzle represented as an 81 int array.
     * @param revealed Indexes of the puzzle to reveal at the begining of the game. The number of these indexes is based on the level.
     * @param level Difficulty level of the puzzle i.e. easy, medium, hard and challenger. The harder the level the fewer indexes that are revealed.
     * @param index Based on level, this is the index of the puzzle. The user will move sequentially through these indexes from game to game.
     */
    public Puzzle(int[] puzzle, int[] revealed, int level, int index) {
        super();
        this.puzzle = puzzle;
        this.revealed = revealed;
        this.level = level;
        this.index = index;
    }

    /**
     * A unique id is created from the level and the index in that level.
     * @return A unique id for this puzzle instance.
     */
    public String getId() {
        return level + "-" + index;
    }

    public int getIndex() {
        return index;
    }

    public int getLevel() {
        return level;
    }

    public int[] getPuzzle() {
        return puzzle;
    }

    public int[] getRevealed() {
        return revealed;
    }

    /**
     * Utility method to get puzzle and revealed as JSON.
     * <pre>
     * {
     *     puzzle: [7,8,9,2,1,5,4,6,3,2,5,6,3,9,4,1,8,7,1,3,4,8,6,7,2,5,9,6,1,7,4,3,9,5,2,8,9,4,5,7,2,8,3,1,6,3,2,8,1,5,6,9,7,4,4,6,1,9,8,2,7,3,5,5,9,3,6,7,1,8,4,2,8,7,2,5,4,3,6,9,1], 
     *     revealed: [4,5,8,11,12,18,24,25,27,28,29,33,34,36,37,39,40,42,44,49,50,51,52,57,59,63,64,66,69,72,73,74,75,79,81]
     * }
     * </pre>
     */
    public static final String toJSON(Puzzle p) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("puzzle: [");
        for (int i = 0; i < p.getPuzzle().length; i++) {
            sb.append(p.getPuzzle()[i]);
            if(i != (p.getPuzzle().length -1)) {
                sb.append(",");
            }
        }
        sb.append("], revealed: [");
        for (int i = 0; i < p.getRevealed().length; i++) {
            sb.append(p.getRevealed()[i]);
            if(i != (p.getRevealed().length -1)) {
                sb.append(",");
            }
        }
        sb.append("]}");
        
        return sb.toString();
    }

    /**
     * Utility method to print board indexes.
     * <pre>
         0  1  2     3  4  5     6  7  8    
         9 10 11    12 13 14    15 16 17    
        18 19 20    21 22 23    24 25 26    
        
        27 28 29    30 31 32    33 34 35    
        36 37 38    39 40 41    42 43 44    
        45 46 47    48 49 50    51 52 53    
        
        54 55 56    57 58 59    60 61 62    
        63 64 65    66 67 68    69 70 71    
        72 73 74    75 76 77    78 79 80    
     * </pre>
     */
    public static final void printIndexes() {
        int index = 0;
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if(index < 10) {
                    System.out.print(" ");                    
                }
                System.out.print(index);
                System.out.print(" ");
                index++;
                if (c % 3 == 2)
                    System.out.print("   ");
            }
            System.out.println();
            if (r % 3 == 2)
                System.out.println();
        }
    }

    /**
     * Utility method to print board values.
     * <pre>
        865 721 439 
        923 648 715 
        341 592 678 
        
        179 263 584 
        482 976 351 
        234 859 167 
        
        518 437 926 
        796 185 243 
        657 314 892 
     * </pre>
     */
    public static final void printAsPuzzle(final int[] puzzle) {
        int index = 0;
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                System.out.print(puzzle[index]);
                index++;
                if (c % 3 == 2)
                    System.out.print(" ");
            }
            System.out.println();
            if (r % 3 == 2)
                System.out.println();
        }
    }
}
