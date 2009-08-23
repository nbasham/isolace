package com.isolace.sudoku.server;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;


import com.isolace.common.ArrayUtil;

/**
 * Handles generation of a puzzle and it's revealed items.
 */
public class PuzzleGeneration {
    private static int EASY_PUZZLE_NUM_CLUES = 35;
    private static int MEDIUM_PUZZLE_NUM_CLUES = 30;
    private static int HARD_PUZZLE_NUM_CLUES = 27;
    private static int CHALLENGE_PUZZLE_NUM_CLUES = 24;
    private static int[][] GRID_INDEXES = {
        { 0, 1, 2, 9, 10, 11, 18, 19, 20 },
        { 3, 4, 5, 12, 13, 14, 21, 22, 23 },
        { 6, 7, 8, 15, 16, 17, 24, 25, 26 },
        { 27, 28, 29, 36, 37, 38, 45, 46, 47 }, 
        { 30, 31, 32, 39, 40, 41, 48, 49, 50 },
        { 33, 34, 35, 42, 43, 44, 51, 52, 53 },
        { 54, 55, 56, 63, 64, 65, 72, 73, 74 },
        { 57, 58, 59, 66, 67, 68, 75, 76, 77 },
        { 60, 61, 62, 69, 70, 71, 78, 79, 80 }
    };
    
    private static int gridFromIndex(int index) {
        for (int row = 0; row < 9; row++) {
            if(ArrayUtil.contains(GRID_INDEXES[row], index))
                return row;
        }
        throw new IllegalArgumentException("Unable to compute grid from index " + index + ".");
    }

    /**
     * Gets the number of revealed item a level has.
     * @param level Game level e.g. easy, medium, hard or challenger
     * @return The number of items to reveal for the given level.
     */
    private static int getNumberOfRevealed(int level) {
        switch (level) {
            case Puzzle.EASY_LEVEL:
                return EASY_PUZZLE_NUM_CLUES;
            case Puzzle.MEDIUM_LEVEL:
                return MEDIUM_PUZZLE_NUM_CLUES;
            case Puzzle.HARD_LEVEL:
                return HARD_PUZZLE_NUM_CLUES;
            case Puzzle.CHALLENGE_LEVEL:
            default:
                return CHALLENGE_PUZZLE_NUM_CLUES;
        }
    }
    
    public static final boolean validPuzzle(int[] puzzle) {
        for (int index = 0; index < puzzle.length; index++) {
            int c = puzzle[index];
            //  check row
            int row = index / 9;
            int rowOffset = row * 9;
            int rowOffsetEnd = rowOffset + 9;
            for (int i = rowOffset; i < rowOffsetEnd; i++) {
                if(i == index) {
                    continue;
                }
                if (puzzle[i] == c) {
                    System.out.println("Row " + row + " at index " + index + " is not unique.");
                    for (int r = rowOffset; r < rowOffsetEnd; r++) {
                        System.out.print(puzzle[r]);
                    }
                    System.out.println();
                    return false;
                }
            }
            //  check col
            int col = index % 9;
            for (int i = col; i < puzzle.length; i += 9) {
                if(i == index) {
                    continue;
                }
                if (puzzle[i] == c) {
                    System.out.println("Column " + col + " at index " + index + " is not unique.");
                    for (int co = col; co < puzzle.length; co += 9) {
                        System.out.print(puzzle[co]);
                    }
                    System.out.println();
                    return false;
                }
            }

            int grid = gridFromIndex(index);
            int[] gridIndexes = GRID_INDEXES[grid];
            for (int i = 0; i < gridIndexes.length; i++) {
                int gridIdex = gridIndexes[i];
                if(gridIdex != index) {
                    if(puzzle[gridIdex] == c) {
                        System.out.print(c + " is not unique in grid: ");
                        for (int g = 0; g < gridIndexes.length; g++) {
                            System.out.print(puzzle[g]);
                        }
                        System.out.println();
                        System.out.println("Index " + index + " is equal to index " + gridIdex + " in grid " + grid + ".");
                        Puzzle.printIndexes();
                        Puzzle.printAsPuzzle(puzzle);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private static final boolean validCandidate(int candidate, int index, int[] puzzle) {
        int row = index / 9;
        int rowOffset = row * 9;
        int rowOffsetEnd = rowOffset + 9;
        if (index < rowOffsetEnd) {
            rowOffsetEnd = index;
        }
        //System.out.println("rowOffset: " + rowOffset + " rowOffsetEnd: " + rowOffsetEnd);
        for (int i = rowOffset; i < rowOffsetEnd; i++) {
            if (puzzle[i] == candidate) {
                return false;
            }
        }

        int col = index % 9;
        for (int i = col; i < index; i += 9) {
            if (puzzle[i] == candidate) {
                return false;
            }
        }

        if(!validGridCandidate(puzzle, index, candidate)) {
            return false;
        }

        return true;
    }

    public static boolean validGridCandidate(int[] puzzle, int index,int candidate) {
        int grid = gridFromIndex(index);
        int[] gridIndexes = GRID_INDEXES[grid];
        for (int i = 0; i < gridIndexes.length; i++) {
            int gridIndex = gridIndexes[i];
            if(gridIndex < index) {
                if(puzzle[gridIndex] == candidate) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * A puzzle should have just one solution. This method looks for pairs of
     * numbers that are inter-changeable allowing for more than one solution.
     * 
     * @param puzzle The puzzle to be analyzed.
     * @return Array of indexes that can result in more than one solution.
     */
    public static final int[] getAmbiguousIndexes(int[] puzzle) {
        int[] temp = new int[81];
        int count = 0;
        for(int index = 0; index < 81; index++) {
            int candidate = puzzle[index];
            int row = index / 9;
            int col = index % 9;
            int rowOffset = row * 9;
            int rowOffsetEnd = rowOffset + 9;
            if (index < rowOffsetEnd) {
                rowOffsetEnd = index;
            }
            if (row != 0 && row != 3 && row != 6 && col > 2) {
                int above = puzzle[index - 9];
                for (int i = rowOffset; i < rowOffsetEnd; i++) {
                    if (puzzle[i] == above) {
                        int above2 = puzzle[i - 9];
                        if (above2 == candidate) {
                            temp[count] = index;
                            count++;
                            //System.out.println("Index"  + index + " " + candidate + " below " + puzzle[index-9]);
                        }
                    }
                }
            }

            if (col != 0 && col != 3 && col != 6) {
                int left = puzzle[index - 1];
                for (int i = col - 1; i < row * 9; i += 9) {
                    if (puzzle[i] == candidate) {
                        int right = puzzle[i + 1];
                        if (right == left) {
                            temp[count] = index;
                            count++;
                            //System.out.println("Index"  + index + " " + candidate + " right " + puzzle[index - 1]);
                        }
                    }
                }
            }
        }
        int[] ambiguous = new int[count];
        for (int i = 0; i < count; i++) {
            ambiguous[i] = temp[i];
        }
        return ambiguous;
    }
    
    /**
     * Returns an array of indexes to be revealed to the user at
     * the start of a game. The easier the level the more clues
     * that are revealed.
     * 
     * @param level Game level.
     * @param puzzle Game puzzle.
     * @param ambiguous Array of ambiguous indexes.
     * @return An array of indexes to be revealed
     * @see #getAmbiguousIndexes(int[])
     */
    public static final int[] generateRevealed(int level, int[]puzzle, int[]ambiguous) {
        int numRevealed = getNumberOfRevealed(level);
        int[] revealed = new int[numRevealed];
        
        //  Add the ambiguos items to the revealed list so puzzle will only have one solution
        for (int i = 0; i < ambiguous.length; i++) {
            revealed[i] = ambiguous[i];
            //System.out.print("-" + i + ":" + revealed[i]);
        }
        
        //  balance out the remaining revealed values between 1 and 9
        int num = numRevealed - ambiguous.length;
        int numEachNumber = num / 9;
        Random r = new Random();
        int index = ambiguous.length;
        for (int h = 0; h < numEachNumber; h++) {
            boolean found = false;
            for (int i = 0; i < 9 && !found; i++) {
                int startIndex = r.nextInt(73);
                for (int j = 0; j < 9 && !found; j++) {
                    if(puzzle[startIndex + j] == i) {
                        if(ArrayUtil.contains(revealed, startIndex + j)) {
                            ; // ignore
                        } else {
                            revealed[index] = startIndex + j;
                            index++;
                        }
                        found = true;
                    }
                }
            }
        }
        
        //  fill remaining items in with unique random values
        while (index < revealed.length) {
            int candidate = r.nextInt(82);
            if(!ArrayUtil.contains(revealed, candidate)) {
                revealed[index] = candidate;
                index++;
            }
        }
        Arrays.sort(revealed);
        //ArrayUtil.printArray(revealed);
        
        return revealed;
    }
    
    /**
     * Generate a puzzle. This is a slow, brute force method to
     * generated puzzles. The speed could be greatly enhanced
     * by being more judicious with Random.
     * 
     * @return An 81 int array representing a Sudoku puzzle.
     */
    public static final int[] generate() {
        int[] puzzle = new int[81];
        boolean solved = false;
        long interations = 0;
        long elapsedTime = 0L;
        long elapsedTime2 = 0L;
        while (!solved) {
            int index = 0;
            Arrays.fill(puzzle, 0);
            boolean solutionPossible = true;
            while (index < 81 && solutionPossible) {
                long startTime = System.currentTimeMillis();
                int[] candidates = ArrayUtil.createAndFillArrayWithUniqueValues(1, 9);
                elapsedTime += System.currentTimeMillis() - startTime;
                for (int i = 0; i < 9; i++) {
                    long startTime2 = System.currentTimeMillis();
                    boolean valid = validCandidate(candidates[i], index, puzzle);
                    elapsedTime2 += System.currentTimeMillis() - startTime2;
                    if (valid) {
                        puzzle[index] = candidates[i];
                        index++;
                        break;
                    }
                    if (i == 8) {
                        solutionPossible = false;
                        //if(index > 45)
                        //    System.out.println("Found " + index);
                    }
                }
                interations++;
            }
            if (index > 80) {
                solved = true;
            }
        }
//        System.out.println("iterations " + interations);
//        System.out.println("createAndFillArrayWithUniqueValues " + elapsedTime + "ms");
//        System.out.println("valid " + elapsedTime2 + "ms");

        return puzzle;
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        List<Puzzle> puzzles = new ArrayList<Puzzle>();
        for (int level = Puzzle.EASY_LEVEL; level <= Puzzle.CHALLENGE_LEVEL; level++) {
            int index = 0;
            while (index < 1000) {
//            for (int index = 0; index < 1; index++) {
                int[] puzzle = PuzzleGeneration.generate();
                if(!validPuzzle(puzzle)) {
                    System.out.println("Skipping invalid puzzle.");
                    continue;
                }
                int[] ambiguos = PuzzleGeneration.getAmbiguousIndexes(puzzle);
                int[] revealed = PuzzleGeneration.generateRevealed(level, puzzle, ambiguos);
                Puzzle p = new Puzzle(puzzle, revealed, level, index);
                puzzles.add(p);
                System.out.println("Added level " + level + " index " + index);
                //ArrayUtil.printArray(puzzle);
                //ArrayUtil.printArray(revealed);
                index++;
            }
        }
        try {
            FileOutputStream fos = new FileOutputStream("puzzles.txt");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(puzzles);
            oos.close();
            System.out.println("Serialized puzzles written to file.");
       } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Completed.");
    }
}
