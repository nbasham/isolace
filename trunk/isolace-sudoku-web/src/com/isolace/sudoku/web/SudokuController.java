package com.isolace.sudoku.web;

import java.io.IOException;
import java.util.Date;

import javax.jdo.PersistenceManager;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.CookieGenerator;
import org.springframework.web.util.WebUtils;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.isolace.gae.PMF;
import com.isolace.sudoku.GameRecord;
import com.isolace.sudoku.server.Puzzle;
import com.isolace.sudoku.server.PuzzleDao;

@Controller
public class SudokuController {

    @Autowired
    public PuzzleDao puzzleDao;
    public static final String INDEX = "index";
    public static final String LEVEL = "level";
    private static final Logger logger = Logger.getLogger(SudokuController.class);

    
    /**
     * Injected PuzzleDao to facilitate access to Sudoku puzzles.
     * @param puzzleDao
     */
    public void setPuzzleDao(PuzzleDao puzzleDao) {
        this.puzzleDao = puzzleDao;
    }

    //  http://localhost:8080/sudoku/start
    @RequestMapping(value = "/start", method = RequestMethod.GET)
    public String start(HttpServletRequest request, HttpServletResponse response, Model model) {
        if (request.getUserPrincipal() != null) {
            String level = SudokuController.getCookieValue(request, response, LEVEL, "0");
            String index = SudokuController.getCookieValue(request, response, INDEX + level, "0");
            setCookie(request, response, LEVEL, level);
            setCookie(request, response, INDEX + level, index);
            model.addAttribute(LEVEL, level);
            model.addAttribute(INDEX, index);
            return "start";
        } else {
            UserService userService = UserServiceFactory.getUserService();
            try {
                response.sendRedirect(userService.createLoginURL(request.getRequestURI()));
            } catch (IOException e) {
                logger.warn("Unable to redirect to log in page.");
            }
        }
        return null;
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
    public String play(@PathVariable int level, @PathVariable int index, HttpServletRequest request, HttpServletResponse response, Model model) {
        setCookie(request, response, LEVEL, "" + level);
        int incrementedIndex = (index + 1);
        int numPuzzlesAtLevel = this.puzzleDao.getNumPuzzles(level);
        if(incrementedIndex >= numPuzzlesAtLevel) {
            incrementedIndex = index % numPuzzlesAtLevel;
        }
        setCookie(request, response, INDEX + level, "" + incrementedIndex);
        Puzzle puzzle = this.puzzleDao.get(level, incrementedIndex);
        model.addAttribute(LEVEL, level);
        model.addAttribute(INDEX, incrementedIndex);
        model.addAttribute("puzzle", intArrayToString(puzzle.getPuzzle()));
        model.addAttribute("revealed", intArrayToString(puzzle.getRevealed()));
        return "sudoku";
    }

    @RequestMapping(value = "/gameOver/level/{level}/index/{index}/time/{time}", method=RequestMethod.GET)
    public String gameOver(@PathVariable int level, @PathVariable int index, @PathVariable long time, HttpServletRequest request, HttpServletResponse response, Model model) {
        PersistenceManager pm = PMF.get().getPersistenceManager();
        UserService userService = UserServiceFactory.getUserService();
        try {
                GameRecord game = new GameRecord(userService.getCurrentUser(), level, index, time, new Date());
                pm.makePersistent(game);
        } finally {
            pm.close();
        }
        return null;
    }

    public static CookieGenerator setCookie(HttpServletRequest request, HttpServletResponse response, String key, String value) {
        CookieGenerator cookie = new CookieGenerator();
        cookie.setCookieDomain(request.getHeader("host"));
        cookie.setCookieMaxAge(60*60*24*365*10);
        cookie.setCookieName(key);
        cookie.addCookie(response, value);
        logger.info("Setting cookie '" + key + "' with value '" + value + "'.");
        return cookie;
    }

    public static final String intArrayToString(int[] a) {
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
    private static final String getCookieValue(HttpServletRequest request, HttpServletResponse response, String key, String defaultValue) {
        Cookie cookie = WebUtils.getCookie(request, key);
        if(cookie == null) {
            setCookie(request, response, key, defaultValue);
            logger.info("No cookie found for " + key + " creating one and using default value " + defaultValue);
            return defaultValue;
        } else {
            String value = cookie.getValue();
            logger.info("Cookie found for " + key + " with value " + value);
            return value;
        }
    }
    private static final int getCookieInt(HttpServletRequest request, HttpServletResponse response, String key, String defaultValue) {
        return Integer.parseInt(getCookieValue(request, response, key, defaultValue));
    }
}
