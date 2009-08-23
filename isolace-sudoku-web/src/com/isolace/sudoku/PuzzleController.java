package com.isolace.sudoku;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.ServletRequestUtils;

import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;

@SuppressWarnings("serial")
public class PuzzleController extends HttpServlet {

    @Autowired
    public PuzzleDao puzzleDao;
    private static final Logger logger = Logger.getLogger(PuzzleController.class);
    
    /**
     * Injected PuzzleDao to facilitate access to Sudoku puzzles.
     * @param puzzleDao
     */
    public void setPuzzleDao(PuzzleDao puzzleDao) {
        this.puzzleDao = puzzleDao;
    }

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int level = ServletRequestUtils.getIntParameter(req, "level", 0);
        int index = ServletRequestUtils.getIntParameter(req, "index", 0);
        resp.setContentType("text/json");
        Puzzle p = this.puzzleDao.get(level, index);
        resp.getWriter().println(Puzzle.toJSON(p));
    }
}
