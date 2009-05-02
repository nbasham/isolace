package com.isolace.sudoku.puzzle;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

import com.isolace.util.ArrayUtil;

public class PuzzleGenerator {

    private static final Logger log = Logger.getLogger(PuzzleGenerator.class.getName());
 
    public static final List<Puzzle[]>generateAllLevels(final int numberOfPuzzles) {
        List<Puzzle[]>puzzles = new ArrayList<Puzzle[]>(4);
        for (int level = 0; level < 4; level++) {
            log.info("Starting generation of level '" + level + " puzzles.");
            Puzzle[] puzzleArray = PuzzleGenerator.generate(numberOfPuzzles, level);
            log.info("Finished generation of level '" + level + " puzzles.");
            puzzles.add(puzzleArray);
        }
        
        return puzzles;
    }

    public static final Puzzle[] generate(final int numberOfPuzzles, final int puzzleLevel) {
        Puzzle[] puzzles = new Puzzle[numberOfPuzzles];
        StringBuilder solution = new StringBuilder(81);
        StringBuilder problem = new StringBuilder(81);
        int numSolutions = 0;
        while(numSolutions < numberOfPuzzles)
        {
            long interations = 0;
            int index = 0;
            solution.setLength(0);
            for(int i = 0; i < 81; i++)
                solution.append("0");
            boolean solutionPossible = true;
            while(index < 81 && solutionPossible)
            {
                int[] candidates = ArrayUtil.createAndFillArrayWithUniqueValues(1, 9);
                for(int i = 0; i < 9; i++)
                {
                    boolean valid = PuzzleUtil.validGuess(index, candidates[i], solution.toString());
                    if(valid)
                    {
                        solution.setCharAt(index, (char)(candidates[i] + '0'));
                        index++;
                        break;
                    }
                    if(i == 8)
                    {
                        solutionPossible = false;
                    }
                }
                interations++;
            }
            if(index > 80)
            {
                problem.setLength(0);
                int numCluesInProblem = Puzzle.getNumHintsForLevel(puzzleLevel);
                for(int i = 0; i < 81; i++)
                    problem.append("0");
                int[] problemPositions = ArrayUtil.createArrayWithUniqueValues(0, 80, numCluesInProblem);
                Arrays.sort(problemPositions);
                for(int i = 0; i < problemPositions.length; i++)
                    problem.setCharAt(problemPositions[i], solution.charAt(problemPositions[i]));
                Puzzle puzzle = new Puzzle(numSolutions, puzzleLevel, solution.toString(), problem.toString());
                puzzles[numSolutions] = puzzle;
//              System.out.println(solution.toString());
//              System.out.println(problem.toString());
                numSolutions++;
            }
        }

        return puzzles;
    }
}
