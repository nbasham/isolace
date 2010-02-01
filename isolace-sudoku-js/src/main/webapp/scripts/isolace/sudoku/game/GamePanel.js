/**
 * Create a GamePanel object.
 * @class Coordinates game concerns (e.g. timer, undo, board).
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.GamePanel = function() {
    this.gameInProgress = false;
    this.markMode = false;
};

/**
 * Initialize the panel.
 * @method load
 */
ISOLACE.GamePanel.prototype.load = function() {
    var me = this;
    $('#markButton').toggle(function() {
        me.markMode = true;
//        $('#markButton').removeClass('ui-state-active');
//        $GameEvent.fireMarkMode(true);
    },
    function() {
        me.markMode = false;
//        $('#markButton').removeClass('ui-state-active');
//        $GameEvent.fireMarkMode(false);
    });
    $GameEvent.handleToggleMarkMode(this, this.handleToggleMarkMode);
    $GameEvent.handleStateChange(this, this.handleStateChanged);
    this.puzzle = this.getNextPuzzle();
    this.timerController = new ISOLACE.TimerController();
    var jsLintLikesThis1 = new ISOLACE.TimerView();
    this.initBoard();
    this.initUndo();
};

/**
 * Show the panel.
 * @method show
 */
ISOLACE.GamePanel.prototype.show = function() {
    $Renderer.render(this.state);
    this.timerController.unpause();
};

/**
 * Hide the panel.
 * @method hide
 */
ISOLACE.GamePanel.prototype.hide = function() {
    this.timerController.pause();
};

/**
 * Initialize board.
 * @method initBoard
 * @private
 */
ISOLACE.GamePanel.prototype.initBoard = function() {
    this.numMissed = 0;
    var boardView = new ISOLACE.sudoku.BoardView();
    var jsLintLikesThis = new ISOLACE.sudoku.BoardViewEvents(boardView, this.puzzle);
    var initialState = this.puzzle.getInitialState();
    this.state = new ISOLACE.sudoku.BoardState(this.puzzle.getValues(), initialState);
    $Renderer.render(this.state);
    boardView.start();
    $TimerEvent.fireTimerStart();
    $GameEvent.handleGuess(this, this.handleGuess);
    $GameEvent.handleMark(this, this.handleMark);
};

/**
 * Initialize undo.
 * @method initUndo
 * @private
 */
ISOLACE.GamePanel.prototype.initUndo = function() {
    var undoController = new ISOLACE.UndoController(this.puzzle.getInitialState());
    var undoView = new ISOLACE.UndoView();
    $UndoEvent.handleUndoEvent(this, function(stateArray) {
        this.state = new ISOLACE.sudoku.BoardState(this.puzzle.getValues(), stateArray);
        $Renderer.render(this.state);
    });
};

/**
 * Set a guess at the given index.
 * @private
 * @method handleGuess
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.GamePanel.prototype.handleGuess = function(value, index) {
    if(this.markMode) {
        this.handleMark(value, index);
        return;
    }
    var correctGuess = this.state.setValue(value, index);
    if(!correctGuess) {
        this.numMissed++;
    }
    $GameEvent.fireStateChange(this.state);
};

/**
 * Set a marker at the given index.
 * @private
 * @method mark
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.GamePanel.prototype.handleMark = function(value, index) {
    this.state.setMarkerValue(value, index);
    $GameEvent.fireStateChange(this.state);
};

/**
 * Handle a state changed event.
 * 
 * We update the undo queue with the boardState array. 
 * @method handleStateChanged
 */
ISOLACE.GamePanel.prototype.handleStateChanged = function(notUsedBoardState) {
    var solved = this.state.solved();
    if(solved) {
        var index = $Persistence.getPuzzleIndex();
        var time = this.timerController.getSeconds();
        var score = $Scores.add(index, time, this.numMissed);
        var formattedScore = $SUDOKU_UTIL.formatTime(score.getScore());
        
        $Persistence.incPuzzleIndex();
        $TimerEvent.fireTimerStop();
        $("#solvedView").dialog( {
            modal : true,
            title : 'Puzzle Solved',
            buttons: { "Ok": function() { $(this).dialog("close"); location.reload(); } }
        }).html('You solved the puzzle. Your score is ' + formattedScore);
    } else {
        $Renderer.render(this.state);
        $UndoEvent.fireSubmitUndoRecordEvent(this.state.state);
    }
};

/**
 * Handle a toggle mark mode event.
 * 
 * @method handleToggleMarkMode
 */
ISOLACE.GamePanel.prototype.handleToggleMarkMode = function() {
    this.markMode = !this.markMode;
};


/**
 * Make a server call, retrieve from cookie, or data lookup and get the next
 * puzzle at the given level.
 * @method getNextPuzzle
 * @private
 */
ISOLACE.GamePanel.prototype.getNextPuzzle = function() {
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
        //  for debugging
        var revealAllButOne = false;
        if(revealAllButOne) {
            revealedIndexes.length = 0;
            for( var j = 0; j < 80; j++) {
                revealedIndexes.push(j);
            }
        }
    }
    //   move this
    $('#infoView').html('Puzzle ' + index);
    var puzzle = new ISOLACE.sudoku.Puzzle(values, revealedIndexes);
    return puzzle;
};
