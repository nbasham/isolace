package com.isolace.sudoku.server;

import java.util.Arrays;

import com.isolace.common.ArrayUtil;

public class PuzzleMaskGeneration {

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
            if (row != 0 && row != 3 && row != 6) {
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
                    if(row == 2 || row == 5 || row == 8) {
                        int twoAbove = puzzle[index - 18];
                        if (puzzle[i] == twoAbove) {
                            int twoAbove2 = puzzle[i - 18];
                            if (twoAbove2 == candidate) {
                                temp[count] = index;
                                count++;
                                //System.out.println("Index"  + index + " " + candidate + " below " + puzzle[index-9]);
                            }
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
            if(col == 2 || col == 5 || col == 8) {
                int twoToTheLeft = puzzle[index - 2];
                for (int i = col - 2; i < row * 9; i += 9) {
                    if (puzzle[i] == candidate) {
                        int twoToTheRight = puzzle[i + 2];
                        if (twoToTheRight == twoToTheLeft) {
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
        Arrays.sort(ambiguous);
        ambiguous = ArrayUtil.removeDuplicates(ambiguous);
        
        return ambiguous;
    }
}
