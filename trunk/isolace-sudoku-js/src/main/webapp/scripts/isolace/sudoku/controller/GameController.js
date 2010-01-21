ISOLACE.namespace("sudoku");

/**
 * GameController handles game flow.
 * @class GameController
 * @namespace ISOLACE.sudoku.controller
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.GameController = function() {
    this.mainMenuView = new ISOLACE.sudoku.MainMenuView();
    $Events.handleShowBoard(this, this.showBoard);
    $Events.handleShowMainMenu(this, this.showMainMenu);
    $Events.handleUndo(this, this.handleUndo);
    $Events.handleStateChange(this, this.handleStateChanged);
};

/**
 * Show the main menu.
 * @method showMenu
 */
ISOLACE.sudoku.GameController.prototype.showMainMenu = function() {
    this.mainMenuView.show();
};

/**
 * Hide the main menu.
 * @method hideMenu
 */
ISOLACE.sudoku.GameController.prototype.hideMainMenu = function() {
    this.mainMenuView.hide();
};

/**
 * Show the main menu.
 * @method showMenu
 */
ISOLACE.sudoku.GameController.prototype.showBoard = function(level) {
    this.options = {};
    this.puzzle = this.getNextPuzzle(level);
    var jsLintLikesThis2 = new ISOLACE.sudoku.TimerView();
    this.hideMainMenu();
    this.initBoard();
    this.initUndo();
};

/**
 * Initialize board.
 * @method initBoard
 * @private
 */
ISOLACE.sudoku.GameController.prototype.initBoard = function() {
    var boardView = new ISOLACE.sudoku.BoardView(this.puzzle, this.options);
    var jsLintLikesThis = new ISOLACE.sudoku.BoardViewEvents(boardView, this.puzzle);
    var boardController = new ISOLACE.sudoku.BoardController(this.puzzle);
    boardView.show(boardController.state);
    boardView.start();
    this.boardController = boardController;
    this.boardView = boardView;
};

/**
 * Initialize undo.
 * @method initUndo
 * @private
 */
ISOLACE.sudoku.GameController.prototype.initUndo = function() {
    var undoController = new ISOLACE.sudoku.UndoController(this.puzzle.getInitialState());
    var undoView = new ISOLACE.sudoku.UndoView(undoController);
    $Events.handleUndoUI(undoView, undoView.handleChange);
    this.undoController = undoController;
};

ISOLACE.sudoku.GameController.prototype.handleUndo = function(isRedo) {
    var stateArray;
    if(isRedo) {
        stateArray = this.undoController.redo();
    } else {
        stateArray = this.undoController.undo();
    }
    assertDefined(stateArray);
    if(stateArray !== null) {
        
        $Log.debug("Reseting board state because of undo event. " + stateArray);
        this.boardController.state = new ISOLACE.sudoku.BoardState(stateArray);
        this.boardView.render(this.boardController.state);
        $Events.fireUndoUI(this.undoController.canUndo(), this.undoController.canRedo());
    } else {
        $Log.debug("UI should prevent this from being possible by deactivating when undo/redo is not possible.");
    }
};

/**
 * Handle a state changed event.
 * 
 * We update the undo que with the boardState array. Arrays are passed by
 * ref and do not have a clone function so we use splice or concat with no
 * arguments to copy the array.
 * @method handleStateChanged
 */
ISOLACE.sudoku.GameController.prototype.handleStateChanged = function(boardState) {
    if(this.boardController.solved()) {
        $Events.fireTimerStop();
        $("#solvedView").dialog( {
            modal : true,
            title : 'Puzzle Solved',
            buttons: { "Ok": function() { $(this).dialog("close"); $Events.fireShowMainMenu(); } }
        }).html('You solved the puzzle.');
    } else {
        var stateArray = boardState.state.concat();
        this.undoController.add(stateArray);
    }
};

/**
 * Hide the main menu.
 * @method hideMenu
 */
ISOLACE.sudoku.GameController.prototype.hideBoard = function() {
    this.boardView.hide();
};

/**
 * Make a server call, retrieve from cookie, or data lookup and get the next
 * puzzle at the given level.
 * @method getNextPuzzle
 */
ISOLACE.sudoku.GameController.prototype.getNextPuzzle = function(level) {
    var values = [8,6,4,5,3,1,2,9,7,9,5,1,6,2,7,8,4,3,2,7,3,4,8,9,6,1,5,1,4,7,9,5,6,3,8,2,3,9,6,2,4,8,5,7,1,5,8,2,1,7,3,9,6,4,6,2,5,8,1,4,7,3,9,7,1,9,3,6,5,4,2,8,4,3,8,7,9,2,1,5,6];
    //var revealedIndexes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
    var revealedIndexes = [2,7,11,12,15,18,21,23,26,29,31,34,35,36,39,40,44,45,46,49,51,54,56,60,62,64,67,68,73,77,78];
    var puzzle = new ISOLACE.sudoku.Puzzle(values, revealedIndexes);
    return puzzle;
};
