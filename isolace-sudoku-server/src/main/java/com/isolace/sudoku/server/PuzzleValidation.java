package com.isolace.sudoku.server;

import com.isolace.common.ArrayUtil;

public class PuzzleValidation {

//    static int[][] ROW_INDEXES = {
//         {0,0},  {1,0},  {2,0},  {3,0},  {4,0},  {5,0},  {6,0},  {7,0},  {8,0},
//         {9,1}, {10,1}, {11,1}, {12,1}, {13,1}, {14,1}, {15,1}, {16,1}, {17,1},
//        {18,2}, {19,2}, {20,2}, {21,2}, {22,2}, {23,2}, {24,2}, {25,2}, {26,2},
//        {27,3}, {28,3}, {29,3}, {30,3}, {31,3}, {32,3}, {33,3}, {34,3}, {35,3},
//        {36,4}, {37,4}, {38,4}, {39,4}, {40,4}, {41,4}, {42,4}, {43,4}, {44,4},
//        {45,5}, {46,5}, {47,5}, {48,5}, {49,5}, {50,5}, {51,5}, {52,5}, {53,5},
//        {54,6}, {55,6}, {56,6}, {57,6}, {58,6}, {59,6}, {60,6}, {61,6}, {62,6},
//        {63,7}, {64,7}, {65,7}, {66,7}, {67,7}, {68,7}, {69,7}, {70,7}, {71,7},
//        {72,8}, {73,8}, {74,8}, {75,8}, {76,8}, {77,8}, {78,8}, {79,8}, {80,8}
//    };
    private static int[] ROW_INDEXES = {
        0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,2,
        3,3,3,3,3,3,3,3,3,
        4,4,4,4,4,4,4,4,4,
        5,5,5,5,5,5,5,5,5,
        6,6,6,6,6,6,6,6,6,
        7,7,7,7,7,7,7,7,7,
        8,8,8,8,8,8,8,8,8
    };
    
    public static int indexToRow(int index) {
        return ROW_INDEXES[index];
    }
    
    private static int[] COL_INDEXES = {
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8,
        0,1,2,3,4,5,6,7,8
    };
    
    public static int indexToCol(int index) {
        return COL_INDEXES[index];
    }
    
    final static int[] GRID_INDEXES = {
        0,0,0,1,1,1,2,2,2,
        0,0,0,1,1,1,2,2,2,
        0,0,0,1,1,1,2,2,2,
        3,3,3,4,4,4,5,5,5,
        3,3,3,4,4,4,5,5,5,
        3,3,3,4,4,4,5,5,5,
        6,6,6,7,7,7,8,8,8,
        6,6,6,7,7,7,8,8,8,
        6,6,6,7,7,7,8,8,8
    };
    
    public static int indexToGrid(int index) {
        return GRID_INDEXES[index];
    }
    
    
    static final int[][] GRID_SEQUENCES = {
        {  0,  1,  2,  9, 10, 11, 18, 19, 20 },
        {  3,  4,  5, 12, 13, 14, 21, 22, 23 },
        {  6,  7,  8, 15, 16, 17, 24, 25, 26 },
        { 27, 28, 29, 36, 37, 38, 45, 46, 47 }, 
        { 30, 31, 32, 39, 40, 41, 48, 49, 50 },
        { 33, 34, 35, 42, 43, 44, 51, 52, 53 },
        { 54, 55, 56, 63, 64, 65, 72, 73, 74 },
        { 57, 58, 59, 66, 67, 68, 75, 76, 77 },
        { 60, 61, 62, 69, 70, 71, 78, 79, 80 }
    };
    
//    static int gridFromIndex(int index) {
//        for (int row = 0; row < 9; row++) {
//            if(ArrayUtil.contains(GRID_INDEXES[row], index))
//                return row;
//        }
//        throw new IllegalArgumentException("Unable to compute grid from index " + index + ".");
//    }

    static boolean conflicts(int[] puzzle, int index, int value) {
        //  check row
        int row = index / 9;
        int rowOffset = row * 9;
        int rowOffsetEnd = rowOffset + 9;
        for (int i = rowOffset; i < rowOffsetEnd; i++) {
            if(i == index) {
                continue;
            }
            if (puzzle[i] == value) {
//                System.out.println("Row " + row + " at index " + index + " is not unique.");
//                for (int r = rowOffset; r < rowOffsetEnd; r++) {
//                    System.out.print(puzzle[r]);
//                }
//                System.out.println();
                return true;
            }
        }
        //  check col
        int col = index % 9;
        for (int i = col; i < puzzle.length; i += 9) {
            if(i == index) {
                continue;
            }
            if (puzzle[i] == value) {
//                System.out.println("Column " + col + " at index " + index + " is not unique.");
//                for (int co = col; co < puzzle.length; co += 9) {
//                    System.out.print(puzzle[co]);
//                }
//                System.out.println();
                return true;
            }
        }

        int grid = indexToGrid(index);
        int[] gridIndexes = GRID_SEQUENCES[grid];
        for (int i = 0; i < gridIndexes.length; i++) {
            int gridIdex = gridIndexes[i];
            if(gridIdex != index) {
                if(puzzle[gridIdex] == value) {
//                    System.out.print(value + " is not unique in grid: ");
//                    for (int g = 0; g < gridIndexes.length; g++) {
//                        System.out.print(puzzle[g]);
//                    }
//                    System.out.println();
//                    System.out.println("Index " + index + " is equal to index " + gridIdex + " in grid " + grid + ".");
//                    Puzzle.printIndexes();
//                    Puzzle.printAsPuzzle(puzzle);
                    return true;
                }
            }
        }
        return false;
    }

    //  TODO this should test the entire puzzle e.g. are revealed indexes from 0 to 80 vs. 1 to 81
    public static final boolean isValid(int[] puzzle) {
        for (int index = 0; index < puzzle.length; index++) {
            int cellValue = puzzle[index];
            if(conflicts(puzzle, index, cellValue)) {
                return false;
            }
        }
        return true;
    }

}
