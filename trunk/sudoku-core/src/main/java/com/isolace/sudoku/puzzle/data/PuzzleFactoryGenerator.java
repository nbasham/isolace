package com.isolace.sudoku.puzzle.data;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.isolace.sudoku.puzzle.Puzzle;
import com.isolace.sudoku.puzzle.PuzzleFactory;
import com.isolace.util.FileUtil;


/**
 * Creates PuzzleFactory. Internal use only. Used to generate a puzzle factory
 * from puzzles files. These files are also used by client app (e.g. iPhone) and
 * server (e.g. AppEngine) to so multiple clients can play against the same
 * puzzle set.
 * 
 * @see PuzzleFactory
 */
public class PuzzleFactoryGenerator {
    
    public static final void generateFactory(final int version, final String puzzleTextFilePath, final int numPuzzles) {
        try {
            Resource templateResource = new ClassPathResource("com/isolace/sudoku/puzzle/data/PuzzleFactory.template");
            String templatePath = templateResource.getFile().getAbsolutePath();
            String template = FileUtil.readStringFromFile(templatePath);
            List<List<Puzzle>> puzzleList = PuzzleFileUtil.readPuzzlesFromFiles(puzzleTextFilePath);
            String[] s = PuzzleFactoryGenerator.getSolutionsArray(puzzleList);
            String[] p = PuzzleFactoryGenerator.getProblemsArray(puzzleList);
            String factoryClass = String.format(template, version, numPuzzles, s[0], s[1], s[2], s[3], p[0], p[1], p[2], p[3]);
            Resource factoryResource = new ClassPathResource("com/isolace/sudoku/puzzle/");
            String factoryPath = factoryResource.getFile().getAbsolutePath() + "/PuzzleFactory.java";
            FileUtil.writeToFile(factoryPath, factoryClass);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static final String[] getSolutionsArray(List<List<Puzzle>> puzzleList) {
        int numLevels = Puzzle.CHALLENGE_LEVEL + 1;
        String[] solutionArray = new String[numLevels];
        for (int level = Puzzle.EASY_LEVEL; level < numLevels; level++) {
            String s = PuzzleFactoryGenerator.getSolutions(puzzleList.get(level));
            solutionArray[level] = s;
        }
        return solutionArray;
    }

    private static final StringBuilder formatArrayElement(String s, boolean lastElement) {
        StringBuilder sb = new StringBuilder();
        sb.append("\t\t\t\t");
        sb.append("\"" + s + "\"");
        if (!lastElement) {
            sb.append(",");
            sb.append("\r");
        }

        return sb;
    }

    private static final String getSolutions(List<Puzzle> puzzleList) {
        StringBuilder sb = new StringBuilder();
        Iterator<Puzzle> it = puzzleList.iterator();
        while (it.hasNext()) {
            sb.append(formatArrayElement(it.next().getSolution(), !it.hasNext()));
        }

        return sb.toString();
    }

    private static final String[] getProblemsArray(List<List<Puzzle>> puzzleList) {
        int numLevels = Puzzle.CHALLENGE_LEVEL + 1;
        String[] problemArray = new String[numLevels];
        for (int level = Puzzle.EASY_LEVEL; level < numLevels; level++) {
            String s = PuzzleFactoryGenerator.getProblems(puzzleList.get(level));
            problemArray[level] = s;
        }
        return problemArray;
    }

    private static final String getProblems(List<Puzzle> puzzleList) {
        StringBuilder sb = new StringBuilder();
        Iterator<Puzzle> it = puzzleList.iterator();
        while (it.hasNext()) {
            sb.append(formatArrayElement(it.next().getSolution(), !it.hasNext()));
        }

        return sb.toString();
    }

    public static void main(String[] args) {
        PuzzleFactoryGenerator.generateFactory(1, "/Users/iSolace/Documents/dev/workspace/sudoku-core/data/20090430-1000", 1000);
    }
}
