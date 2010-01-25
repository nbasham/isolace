ISOLACE.namespace("sudoku");

/**
 * BoardManager coordinates board concerns (e.g. timer, undo, board).
 * 
 * @class BoardManager
 * @namespace ISOLACE.sudoku.controller
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.BoardManager = function(options) {
    this.options = options;
};

/**
 * Show board concerns.
 * @private
 * @method show
 */
ISOLACE.sudoku.BoardManager.prototype.show = function() {
    $Events.handleShowBoard(this, this.showBoard);
    $Events.handleUndo(this, this.handleUndo);
    $Events.handleStateChange(this, this.handleStateChanged);
    this.puzzle = this.getNextPuzzle();
    var jsLintLikesThis = new ISOLACE.sudoku.TimerController();
    var jsLintLikesThis2 = new ISOLACE.sudoku.TimerView();
    this.initBoard();
    this.initUndo();
};

/**
 * Show board concerns.
 * @private
 * @method hide
 */
ISOLACE.sudoku.BoardManager.prototype.hide = function() {
    this.boardView.hide();
};


/**
 * Initialize board.
 * @method initBoard
 * @private
 */
ISOLACE.sudoku.BoardManager.prototype.initBoard = function() {
    var boardView = new ISOLACE.sudoku.BoardView(this.options);
    var jsLintLikesThis = new ISOLACE.sudoku.BoardViewEvents(boardView, this.puzzle);
    var initialState = this.puzzle.getInitialState();
    this.state = new ISOLACE.sudoku.BoardState(initialState);
    boardView.show(this.state);
    boardView.start();
    $Events.handleGuess(this, this.handleGuess);
    $Events.handleMark(this, this.handleMark);
    this.boardView = boardView;
};

/**
 * Initialize undo.
 * @method initUndo
 * @private
 */
ISOLACE.sudoku.BoardManager.prototype.initUndo = function() {
    var undoController = new ISOLACE.sudoku.UndoController(this.puzzle.getInitialState());
    var undoView = new ISOLACE.sudoku.UndoView(undoController);
    $Events.handleUndoUI(undoView, undoView.handleChange);
    this.undoController = undoController;
};

ISOLACE.sudoku.BoardManager.prototype.handleUndo = function(isRedo) {
    var stateArray;
    if(isRedo) {
        stateArray = this.undoController.redo();
    } else {
        stateArray = this.undoController.undo();
    }
    assertDefined(stateArray);
    if(stateArray !== null) {
        
        $Log.debug("Reseting board state because of undo event. " + stateArray);
        this.state = new ISOLACE.sudoku.BoardState(stateArray);
        this.boardView.render(this.state);
        $Events.fireUndoUI(this.undoController.canUndo(), this.undoController.canRedo());
    } else {
        $Log.debug("UI should prevent this from being possible by deactivating when undo/redo is not possible.");
    }
};

/**
 * Set a guess at the given index.
 * @private
 * @method handleGuess
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardManager.prototype.handleGuess = function(value, index) {
    this.state.setValue(value, index);
    $Events.fireStateChange(this.state);
    if(this.state.getValue(index) != this.puzzle.getValue(index)) {
        //  incorrect guess
    }
};

/**
 * Set a marker at the given index.
 * @private
 * @method mark
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardManager.prototype.handleMark = function(value, index) {
    this.state.setMarkerValue(value, index);
    $Events.fireStateChange(this.state);
};

/**
 * Handle a state changed event.
 * 
 * We update the undo que with the boardState array. 
 * @method handleStateChanged
 */
ISOLACE.sudoku.BoardManager.prototype.handleStateChanged = function(boardState) {
    var solved = this.state.solved(this.puzzle);
    if(solved) {
        $Persistence.incPuzzleIndex();
        $Events.fireTimerStop();
        $("#solvedView").dialog( {
            modal : true,
            title : 'Puzzle Solved',
            buttons: { "Ok": function() { $(this).dialog("close"); location.reload(); } }
        }).html('You solved the puzzle.');
    } else {
        this.undoController.add(this.state.state);
    }
};


/**
 * Make a server call, retrieve from cookie, or data lookup and get the next
 * puzzle at the given level.
 * @method getNextPuzzle
 */
ISOLACE.sudoku.BoardManager.prototype.getNextPuzzle = function() {
    var values;
    var revealedIndexes;
    var index = $Persistence.getPuzzleIndex();
    if(false) {
        values = [8,6,4,5,3,1,2,9,7,9,5,1,6,2,7,8,4,3,2,7,3,4,8,9,6,1,5,1,4,7,9,5,6,3,8,2,3,9,6,2,4,8,5,7,1,5,8,2,1,7,3,9,6,4,6,2,5,8,1,4,7,3,9,7,1,9,3,6,5,4,2,8,4,3,8,7,9,2,1,5,6];
        revealedIndexes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79];
        //revealedIndexes = [2,7,11,12,15,18,21,23,26,29,31,34,35,36,39,40,44,45,46,49,51,54,56,60,62,64,67,68,73,77,78];
    } else {
        values = [];
        revealedIndexes = [];
        var puzzleArray = ISOLACE.sudoku.puzzles[index];
        for( var i = 0; i < puzzleArray.length; i++) {
            var cell = puzzleArray[i];
            if(cell > 9) {
                values.push(cell - 9);
                revealedIndexes.push(i);
            } else {
                values.push(cell);
            }
        }
//        revealedIndexes.length = 0;
//        for( var i = 0; i < 80; i++) {
//            revealedIndexes.push(i);
//        }
    }
    //   move this
    $('#infoView').html('Puzzle ' + index);
    var puzzle = new ISOLACE.sudoku.Puzzle(values, revealedIndexes);
    return puzzle;
};
