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
    
    public static boolean validGridCandidate(int[] puzzle, int index,int candidate) {
        int grid = PuzzleValidation.indexToGrid(index);
        int[] gridIndexes = PuzzleValidation.GRID_SEQUENCES[grid];
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
     * Returns an array of indexes to be revealed to the user at
     * the start of a game. The easier the level the more clues
     * that are revealed.
     * 
     * @param level Game level.
     * @param puzzle Game puzzle.
     * @param ambiguous Array of ambiguous indexes.
     * TODO is return array from 0 to 80 inclusive?
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
        // TODO 82??? should be 81
        while (index < revealed.length) {
            int candidate = r.nextInt(81);
            if(!ArrayUtil.contains(revealed, candidate)) {
                revealed[index] = candidate;
                index++;
            }
        }
        Arrays.sort(revealed);
        //ArrayUtil.printArray(revealed);
        
        return revealed;
    }
    
    private static boolean validCandidate(int candidate, int index, int[] puzzle) {
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
    
        if(!PuzzleGeneration.validGridCandidate(puzzle, index, candidate)) {
            return false;
        }
    
        return true;
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

    public static void main(String[] args) {
        List<Puzzle> puzzles = new ArrayList<Puzzle>();
        for (int level = Puzzle.EASY_LEVEL; level <= Puzzle.CHALLENGE_LEVEL; level++) {
            int index = 0;
            while (index < 1000) {
                int[] puzzle = PuzzleGeneration.generate();
                if(!PuzzleValidation.isValid(puzzle)) {
                    System.out.println("Skipping invalid puzzle.");
                    continue;
                }
                int[] ambiguos = PuzzleMaskGeneration.getAmbiguousIndexes(puzzle);
                int[] revealed = PuzzleGeneration.generateRevealed(level, puzzle, ambiguos);
                Puzzle p = new Puzzle(puzzle, revealed, level, index);
                puzzles.add(p);
                System.out.print("Added level " + level + " index " + index);
                new PuzzleSolver(puzzle, revealed).canSolve(null);
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
