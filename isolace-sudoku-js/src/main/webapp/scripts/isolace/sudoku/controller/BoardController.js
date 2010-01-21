ISOLACE.namespace("sudoku");

/**
 * BoardController bridges the board UI and Model (BoardPanel and BoardState) applying
 * game logic.
 * 
 * @class BoardController
 * @namespace ISOLACE.sudoku.controller
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.BoardController = function(puzzle) {
    this.puzzle = puzzle;
    var initialState = puzzle.getInitialState();
    this.state = new ISOLACE.sudoku.BoardState(initialState);
    $Events.handleGuess(this, this.guess);
    $Events.handleMark(this, this.mark);
    this.timerController = new ISOLACE.sudoku.TimerController();
};

/**
 * Checks to see if the puzzle has been successfully solved.
 * 
 * @method solved
 * @return {boolean} True if all of the guesses are complete and correct.
 */
ISOLACE.sudoku.BoardController.prototype.solved = function() {
    var solved = this.state.solved(this.puzzle);
    return solved;
};

/**
 * Player took a guess at the given index.
 * @private
 * @method guess
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardController.prototype.guess = function(value, index) {
    assertInRange(value, 1, 9);
    assertInRange(index, 0, 80);
    var isEditable = this.state.isEditable(index);
    assertTrue(isEditable, "Can't set a value on a revealed cell.");
    
    this.state.setValue(value, index);
    ISOLACE.log('Index ' + index + ' set to ' + this.state.state[index]);
    this.removeMarkersFromGrid(value, index);
    //$undo.add($logic.getState());
    $Events.fireStateChange(this.state);
};

/**
 * After a successful guess remove markers with this value from grid.
 * @private
 * @method removeMarkersFromGrid
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardController.prototype.removeMarkersFromGrid = function(value, index) {
    var grid = $SUDOKU_UTIL.getGridFromIndex(index);
    //ISOLACE.log('Checking grid ' + grid + ' to see if any hints of value ' + value + ' exist.');
    var a = $SUDOKU_UTIL.getGridIndexes(grid);
    //ISOLACE.log('Grid indexes: ' + a);
    for(var i = 0; i < 9; i++) {
        var gridIndex = a[i];
        if(index == gridIndex) {
            continue;
        }
        var hasMarkerValue = this.state.hasMarkerValue(value, gridIndex);
       // ISOLACE.log('Cell ' + gridIndex + ' value ' + value + ' result: ' + hasMarkerValue);
        if(hasMarkerValue) {
            //  this will toggle the marker to off
            this.state.setMarkerValue(value, gridIndex);
            ISOLACE.log('Removed marker of value ' + value + ' from cell ' + gridIndex + '.');

        }
    }
};

/**
 * Attempt to set a marker at the given index.
 * @private
 * @method mark
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardController.prototype.mark = function(value, index) {
    assertInRange(value, 1, 9);
    assertInRange(index, 0, 80);
    var isEditable = this.state.isEditable(index);
    assertTrue(isEditable, "Can't set a value on a revealed cell.");

    this.state.setMarkerValue(value, index);
    ISOLACE.log('Index ' + index + ' set to ' + this.state.state[index]);
    $Events.fireStateChange(this.state);
    //$undo.add($logic.getState());
};

