package com.isolace.sudoku.web;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.CookieGenerator;
import org.springframework.web.util.WebUtils;

import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;

@Controller
public class SudokuController {

    @Autowired
    public PuzzleDao puzzleDao;
    private static final String INDEX = "index";
    private static final String LEVEL = "level";

    
    /**
     * Injected PuzzleDao to facilitate access to Sudoku puzzles.
     * @param puzzleDao
     */
    public void setPuzzleDao(PuzzleDao puzzleDao) {
        this.puzzleDao = puzzleDao;
    }

    //  http://localhost:8080/sudoku/start
    @RequestMapping(value = "/start", method=RequestMethod.GET)
    public String start(HttpServletRequest request, HttpServletResponse response, Model model) {
        String level = getCookieValue(request, LEVEL, "2");
        String index = SudokuController.getCookieValue(request, INDEX, "3");
        CookieGenerator cookie = new CookieGenerator();
        cookie.setCookieMaxAge(Integer.MAX_VALUE);
        cookie.setCookieName(LEVEL);
        cookie.addCookie(response, level);
        cookie.setCookieName(INDEX);
        cookie.addCookie(response, index);
        model.addAttribute("level", level);
        model.addAttribute("index", index);
        return "start";
    }

    //  http://localhost:8080/sudoku/level/0/index/0
    @RequestMapping(value = "/level/{level}/index/{index}", method=RequestMethod.GET)
    public String puzzleJSON(@PathVariable int level, @PathVariable int index, Model model) {
        Puzzle puzzle = this.puzzleDao.get(level, index);
        model.addAttribute("data", puzzle);
        return "sudoku/json";
    }


    //  http://localhost:8080/sudoku/play/level/0/index/0
    @RequestMapping(value = "/play/level/{level}/index/{index}", method=RequestMethod.GET)
    public String game(@PathVariable int level, @PathVariable int index, Model model) {
        Puzzle puzzle = this.puzzleDao.get(level, index);
        model.addAttribute("puzzle", intArrayToString(puzzle.getPuzzle()));
        model.addAttribute("revealed", intArrayToString(puzzle.getRevealed()));
        return "sudoku";
    }

    private static final String intArrayToString(int[] a) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        int len = a.length;
        for (int i = 0; i < len; i++) {
            sb.append(a[i]);
            if(i != (len-1)) {
                sb.append(",");
            }
        }
        sb.append("]");
        
        return sb.toString();
    }
    private static final String getCookieValue(HttpServletRequest request, String key, String defaultValue) {
        Cookie cookie = WebUtils.getCookie(request, key);
        return cookie == null ? defaultValue : cookie.getValue();
    }
}
