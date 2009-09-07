package com.isolace.sudoku.server;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import com.isolace.common.ArrayUtil;

public class PuzzleSolver {

    private class Pair {
        int value;
        int index;
    }
    
    private class Cell {
        int value;
        int index;
        int row;
        int col;
        int grid;
        int numTimesOccursInGrid;
        
        @Override
        public String toString() {
            return "Cell at index " + index + ", row " + row + ", col " + col + ", grid " + grid + " could have a value of " + value + ".  The value " + value + " can reside in " + numTimesOccursInGrid + " other cells in this grid.";
        }
    }
    
    private class CellPair extends Cell {
        int index2;
        
        @Override
        public String toString() {
            return "Grid " + grid + " can only have value " + value + " at indexes " + index + " and " + index2 + ".";
        }
    }
    
    private int[] solution;
    private int numFound;
    private int[] puzzle;
    private int puzzleLength;
    
    public PuzzleSolver(int[] puzzle, int[] revealed) {
        this.puzzle = puzzle;
        this.puzzleLength = this.puzzle.length;
        this.numFound = revealed.length;
        this.solution = new int[puzzleLength];
        for (int i : revealed) {
            this.solution[i] = this.puzzle[i];
        }
    }
    
    /**
     * Can this puzzle be solved, without guessing.
     * @param out Null if no output is desired, otherwise any PrintStream e.g. System.out.
     * @return True if puzzle can be solved.
     */
    public boolean canSolve(PrintStream out) {
        boolean found = true;
        int iterations = 0;
        while(found) {
            found = checkForGimmes(null);
            iterations++;
        }
//        checkGridsForPairs(out);
//        Puzzle.printAsPuzzle(this.solution);
//        ArrayUtil.printArray(this.solution);
//        ArrayUtil.printArray(this.puzzle);
        int count = 0;
        for (int i : this.solution) {
            if(i != 0) {
                count++;
            }
        }
        System.out.println("  Found " + count + " in " + iterations + " iterations.");
        return true;
    }
    
    private static void printCellArray(Cell[] a) {
        for (Cell cell : a) {
            if(cell != null) {
                System.out.println(cell.toString());
            }
        }
    }
    
    private static void printCellList(List<CellPair> a) {
        for (Cell cell : a) {
            if(cell != null) {
                System.out.println(cell.toString());
            }
        }
    }
    
    private boolean checkGridsForPairs(PrintStream out) {
        boolean foundSolution = false;
        for (int gridIndex = 0; gridIndex < PuzzleValidation.GRID_SEQUENCES.length; gridIndex++) {
            CellPair[] gridCells = getGridCells(gridIndex);
            List<CellPair> gridPairs = filterOnTwoInGrid(gridCells);
            printCellList(gridPairs);
        }
        return foundSolution;
    }
    
    private List<CellPair> filterOnTwoInGrid(CellPair[] gridCells) {
        List<CellPair> l = new ArrayList<CellPair>();
        
        for (CellPair cell : gridCells) {
            if(cell != null && cell.numTimesOccursInGrid == 2) {
                l.add(cell);
            }
        }

        return l;
    }

    private CellPair[] getGridCells(int gridIndex) {
        CellPair[] gridCells = new CellPair[9];
        int[] gridSequence = PuzzleValidation.GRID_SEQUENCES[gridIndex];
        for (int gridSequenceIndex = 0; gridSequenceIndex < gridSequence.length; gridSequenceIndex++) {
            int index = gridSequence[gridSequenceIndex];
            if(this.solution[index] != 0) {
                continue;
            }
            for (int candidate = 1; candidate <= 9; candidate++) {
                boolean conflicts = PuzzleValidation.conflicts(this.solution, index, candidate);
                if(!conflicts) {
                    if(gridCells[candidate-1] == null) {
                        gridCells[candidate-1] = new CellPair();
                    }
                    CellPair c = gridCells[candidate-1];
                    if(c.numTimesOccursInGrid == 0) {
                        c.index = index;
                    } else if(c.numTimesOccursInGrid == 1) {
                        c.index2 = index;
                    }
                    c.col = PuzzleValidation.indexToCol(index);
                    c.row = PuzzleValidation.indexToRow(index);
                    c.grid = PuzzleValidation.indexToGrid(index);
                    c.numTimesOccursInGrid++;
                    c.value = candidate;
                }
            }
        }
        return gridCells;
    }
    
    /**
     * Check for cells that only have one possibility.
     * @return True if a solution is found.
     */
    private  boolean checkForGimmes(PrintStream out) {
        boolean foundSolution = false;
        Pair match = new Pair();
        for (int index = 0; index < this.puzzleLength; index++) {
            if(this.solution[index] != 0) {
                continue;
            }
            int numCandidates = 0;
            for (int candidate = 1; candidate <= 9; candidate++) {
                boolean conflicts = PuzzleValidation.conflicts(this.solution, index, candidate);
                if(!conflicts) {
                    numCandidates++;
                    if(numCandidates == 1) {
                        match.value = candidate;
                        match.index = index;
                    }
                }
            }
            if(numCandidates == 1) {
                this.solution[match.index] = match.value;
                this.numFound++;
                foundSolution = true;
                if(out != null) {
                    out.println("Solution found at index " + match.index + " with value " + match.value);
                }
            } else {
                //out.println("No solution found at index " + index + " due to too many matches " + numCandidates);
            }
        }
        return foundSolution;
    }
}
