package com.isolace.sudoku.server;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * Provides access to Puzzles.
 */
@SuppressWarnings("unchecked")
public class PuzzleDaoFile implements PuzzleDao {

    private List<Puzzle> puzzles;
    private int[] numPuzzles = new int[4];
    private String classPath;
    
    public PuzzleDaoFile(String classPath) {
        this.classPath = classPath;
    }

    private void init() throws IllegalStateException {
        try {
            //  com/isolace/sudoku/server/puzzles-100x4.txt
            Resource r = new ClassPathResource(classPath);
            ObjectInputStream objectIn = new ObjectInputStream(new BufferedInputStream(r.getInputStream()));
            puzzles = (List<Puzzle>) objectIn.readObject();
            for (Puzzle puzzle : puzzles) {
                this.numPuzzles[puzzle.getLevel()]++;
            }
            objectIn.close();
        } catch (IOException e) {
            throw new IllegalStateException("Unable to unserialize puzzles.", e);
        } catch (ClassNotFoundException e) {
            throw new IllegalStateException("Unable to find puzzles.", e);
        }
    }
    
    /**
     * Get the puzzle specified by level and index. Takes less than
     * 100ms to load and ~1ms to access.
     * 
     * @param level The Sudoku game level.
     * @param index The game index in that level.
     * @return Puzzle specified by level and index, null if not found;
     */
    public Puzzle get(int level, int index) throws IllegalStateException {
        if(puzzles == null) {
            init();
        }
        if(puzzles == null) {
            throw new IllegalStateException("No puzzles exist.");
        }
        for (Puzzle puzzle : puzzles) {
            if(puzzle.getLevel() == level && puzzle.getIndex() == index) {
                return puzzle;
            }
        }
        throw new IllegalArgumentException("No puzzle matching level " + level + " index " + index + ".");
    }
    
    public int getNumPuzzles(int level) {
        if(puzzles == null) {
            init();
        }
        return numPuzzles[level];
    }

    public static void main(String[] args) {
        PuzzleDao p = new PuzzleDaoFile("puzzles-100x4.txt");
        long startTime = System.currentTimeMillis();
        p.get(4 ,98);
        long elapsedTime = System.currentTimeMillis() - startTime;
        System.out.print("Load time " + elapsedTime + "ms");
        startTime = System.currentTimeMillis();
        p.get(4 ,99);
        elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println(" access time " + elapsedTime + "ms");
    }
}
