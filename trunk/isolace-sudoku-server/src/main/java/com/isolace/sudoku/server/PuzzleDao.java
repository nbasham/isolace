package com.isolace.sudoku.server;

public interface PuzzleDao {
    Puzzle get(int level, int index) throws IllegalStateException;
    int getNumPuzzles(int level);
}
