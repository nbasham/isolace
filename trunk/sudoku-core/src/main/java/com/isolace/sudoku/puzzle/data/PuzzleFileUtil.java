package com.isolace.sudoku.puzzle.data;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.isolace.sudoku.puzzle.Puzzle;
import com.isolace.sudoku.puzzle.PuzzleGenerator;
import com.isolace.util.FileUtil;

/**
 * Utilities to work with puzzles files. You probably don't want to use this
 * class as it is used to create puzzles shared across platforms (e.g. iPhone,
 * AppEngine).
 * 
 * @see PuzzleGenerator
 * @see Puzzle
 * 
 */
public class PuzzleFileUtil {

    private static final Logger log = Logger.getLogger(PuzzleFileUtil.class.getName());
    public static final int NUM_PUZZLES = 1000;
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    private static final String PATH = "./data/" + sdf.format(new Date()) + "-" + NUM_PUZZLES;

    /**
     * Create a file for each level with the format:
     * solution0,problem0,solution1,problem1...
     * 
     * Currently, used by XCode app to generate pinfo files for iPhone.
     * 
     * @see PuzzleGenerator
     * @see Puzzle
     * 
     */
    public static final void writePuzzles(Puzzle[] puzzles, final String path, final int level) {
        String fname = Puzzle.puzzleLevelToString(level) + ".txt";
        String fullPath = path + "/text/" + fname;
        log.info("Starting writing puzzle '" + fullPath + "'.");
        try {
            BufferedWriter out = new BufferedWriter(new FileWriter(fullPath));
            for (int i = 0; i < puzzles.length; i++) {
                Puzzle p = puzzles[i];
                out.write(p.getSolution() + "," + p.getProblem());
                if (i != (puzzles.length - 1)) {
                    out.write(",");
                }
            }
            out.close();
        } catch (Exception e) {
            log.warning(e.getMessage());
        }
        log.info("Finished writing puzzle '" + fullPath + "'.");
    }

    /**
     * Reads files for each level and creates a list of puzzles for each level.
     * 
     * @return List of per level puzzle lists.
     */
    public static final List<List<Puzzle>> readPuzzlesFromFiles(String path) {
        String localPath = path + "/text/";
        List<List<Puzzle>> puzzleList = new ArrayList<List<Puzzle>>(4);
        for (int level = Puzzle.EASY_LEVEL; level <= Puzzle.CHALLENGE_LEVEL; level++) {
            String fname = Puzzle.puzzleLevelToString(level) + ".txt";
            List<Puzzle> puzzles = PuzzleFileUtil.readPuzzleFromFile(localPath + fname, level);
            puzzleList.add(puzzles);
        }
        return puzzleList;
    }

    private static final List<Puzzle> readPuzzleFromFile(final String fname, final int level) {
        List<Puzzle> puzzles = new ArrayList<Puzzle>();
        String fcontent = FileUtil.readStringFromFile(fname);
        String[] toks = fcontent.split(",");
        for (int i = 0; i < toks.length; i += 2) {
            String solution = toks[i];
            String problem = toks[i + 1];
            Puzzle p = new Puzzle(level, i / 2, solution, problem);
            puzzles.add(p);
        }

        return puzzles;
    }

    public static void main(String[] args) {
        log.info("Starting puzzle generation.");
        List<Puzzle[]> puzzleList = PuzzleGenerator.generateAllLevels(NUM_PUZZLES);
        log.info("Finished puzzle generation.");
        log.info("Starting writing puzzles to '" + PATH + "'.");
        File f = new File(PATH);
        f.mkdir();
        int level = Puzzle.EASY_LEVEL;
        for (Puzzle[] puzzles : puzzleList) {
            PuzzleFileUtil.writePuzzles(puzzles, PATH, level);
            level++;
        }
        log.info("Finished writing puzzles.");
    }

}
