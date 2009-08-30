package com.isolace.sudoku.web.test;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.isolace.sudoku.server.PuzzleDao;
import com.isolace.sudoku.server.PuzzleDaoFile;
import com.isolace.sudoku.web.SudokuController;

public class SudokuControllerTest {
    
    public PuzzleDao puzzleDao = new PuzzleDaoFile("puzzles-100x4.txt");
    private static final String EASY_LEVEL_INDEX_KEY = "0";
    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    /**
     * Setup method which will be executed before each test method.
     */
    @BeforeMethod
    public void setUp() {
        this.request = new MockHttpServletRequest();
        //  handleRequest checks method
        this.request.setMethod("GET");
        this.response = new MockHttpServletResponse();
    }

    /**
     * URI start
     */
    @Test
    public void testStart() throws Exception {
        SudokuController controller = new SudokuController();
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        String view = controller.start(this.request, this.response, model);
        assertEquals(view, "start");
    }

    /**
     * URI start: test LEVEL cookie
     */
    @Test
    public void testLevelCookie() throws Exception {
        SudokuController controller = new SudokuController();
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertEquals("0", response.getCookie(SudokuController.LEVEL).getValue());
    }

    /**
     * URI start: test preset LEVEL cookie
     */
    @Test
    public void testPresetLevelCookie() throws Exception {
        String presetValue = "42";
        SudokuController.setCookie(this.request, this.response, SudokuController.LEVEL, presetValue);
        SudokuController controller = new SudokuController();
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertEquals(presetValue, response.getCookie(SudokuController.LEVEL).getValue());
    }

    /**
     * URI start: test INDEX + LEVEL cookie
     */
    @Test
    public void testIndexLevelCookie() throws Exception {
        SudokuController controller = new SudokuController();
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertEquals("0", response.getCookie(SudokuController.INDEX + EASY_LEVEL_INDEX_KEY).getValue());
    }

    /**
     * URI start: test preset INDEX + LEVEL cookie
     */
    @Test
    public void testPresetIndexLevelCookie() throws Exception {
        String presetValue = "89";
        SudokuController.setCookie(this.request, this.response, SudokuController.INDEX + EASY_LEVEL_INDEX_KEY, presetValue);
        SudokuController controller = new SudokuController();
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertEquals(presetValue, response.getCookie(SudokuController.INDEX + EASY_LEVEL_INDEX_KEY).getValue());
    }

    /**
     * URI start: test LEVEL model
     */
    @Test
    public void testLevelModel() throws Exception {
        SudokuController controller = new SudokuController();
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertTrue(model.containsAttribute(SudokuController.LEVEL));
    }

    /**
     * URI start: test INDEX model
     */
    @Test
    public void testIndexModel() throws Exception {
        SudokuController controller = new SudokuController();
        ExtendedModelMap model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertEquals(model.get(SudokuController.INDEX).toString(), "0");
    }

    /**
     * URI start: test preset INDEX model
     */
    @Test
    public void testPresetIndexModel() throws Exception {
        SudokuController controller = new SudokuController();
        String presetValue = "89";
        SudokuController.setCookie(this.request, this.response, SudokuController.INDEX + EASY_LEVEL_INDEX_KEY, presetValue);
        this.request.setCookies(this.response.getCookies());
        ExtendedModelMap model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/start");
        controller.start(this.request, this.response, model);
        assertEquals(model.get(SudokuController.INDEX), presetValue);
    }

    /**
     * URI play
     */
    @Test
    public void testPlay() throws Exception {
        SudokuController controller = new SudokuController();
        controller.setPuzzleDao(this.puzzleDao);
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/play/level/0/index/0");
        String view = controller.play(0, 0, this.request, this.response, model);
        assertEquals(view, "sudoku");
    }

    /**
     * URI play: test LEVEL model
     */
    @Test
    public void testPuzzleInModel() throws Exception {
        SudokuController controller = new SudokuController();
        int index = 22;
        controller.setPuzzleDao(this.puzzleDao);
        ExtendedModelMap model = new ExtendedModelMap();
        //this.request.setRequestURI("sudoku/play/level/0/index/" + index);
        controller.play(0, index, this.request, this.response, model);
        String puzzle = (String)model.get("puzzle");
        assertEquals(SudokuController.intArrayToString(this.puzzleDao.get(0, index+1).getPuzzle()), puzzle);
    }

    /**
     * URI play: test INDEX model
     */
    @Test
    public void testRevealedInModel() throws Exception {
        SudokuController controller = new SudokuController();
        int index = 12;
        controller.setPuzzleDao(this.puzzleDao);
        ExtendedModelMap model = new ExtendedModelMap();
        //this.request.setRequestURI("sudoku/play/level/0/index/" + index);
        controller.play(0, index, this.request, this.response, model);
        String revealed = (String)model.get("revealed");
        assertEquals(SudokuController.intArrayToString(this.puzzleDao.get(0, index+1).getRevealed()), revealed);
    }

    /**
     * URI play: increment level
     */
    @Test
    public void testPlayIncrementIndex() throws Exception {
        SudokuController controller = new SudokuController();
        int presetValue = 27;
        controller.setPuzzleDao(this.puzzleDao);
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/play/level/0/index/0");
        controller.play(0, presetValue, this.request, this.response, model);
        assertEquals("" + (presetValue + 1), response.getCookie(SudokuController.INDEX + EASY_LEVEL_INDEX_KEY).getValue());
    }

    /**
     * URI play: increment level past end
     */
    @Test
    public void testPlayIncrementIndexPastEnd() throws Exception {
        SudokuController controller = new SudokuController();
        int presetValue = this.puzzleDao.getNumPuzzles(0);
        controller.setPuzzleDao(this.puzzleDao);
        Model model = new ExtendedModelMap();
        this.request.setRequestURI("sudoku/play/level/0/index/0");
        controller.play(0, presetValue, this.request, this.response, model);
        assertEquals("0", response.getCookie(SudokuController.INDEX + EASY_LEVEL_INDEX_KEY).getValue());
    }

    /**
     * URI gameOver
     */
//    @Test
//    public void testGameOver() throws Exception {
//        SudokuController controller = new SudokuController();
//        controller.setPuzzleDao(this.puzzleDao);
//        Model model = new ExtendedModelMap();
//        this.request.setRequestURI("sudoku/play/level/0/index/0/time/23432");
//        String view = controller.gameOver(System.currentTimeMillis(), this.request, this.response, model);
//        assertEquals(view, "sudoku");
//    }
}
