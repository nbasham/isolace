ISOLACE.namespace("sudoku");

/**
 * State defines the cell values of a Sudoku board at some point in time.
 * Each cell can contain:
 *  -   a revealed cell with a value from 10 to 18
 *  -   a guessed cell with a value from 1 to 9, 0 if empty (no guess yet)
 *  -   a marker(s) cell with a values less than 0
 * 
 * <pre>
 * Example usage:
 *      var puzzle = new ISOLACE.sudoku.Puzzle(values, revealedIndexes);
 *      var initialState = puzzle.getInitialState();
 *      var state = new ISOLACE.sudoku.BoardState(initialState);
 * </pre>
 * 
 * @class State
 * @namespace ISOLACE.sudoku.model
 * @constructor
 * @param {int[]} state The current puzzle state.
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.BoardState = function(state) {
    this.state = state;
};

/**
 * Normalize state by removing conventions applied to cell values by BoardState.
 * 
 * @method normalize
 * @return {array[int]} An array values 0 to 9 inclusive describing the state of the board.
 */
ISOLACE.sudoku.BoardState.prototype.equals = function(bs) {
    if(bs === undefined || bs === null || bs.state.length != this.state.length) {
        return false;
    }
    for(var i = 0; i < 81; i++) {
        if(bs.state[i] != this.state[i]) {
            return false;
        }
    }

    return true;
};

/**
 * @private
 * Normalize state by removing conventions applied to cell values by BoardState.
 * 
 * @method normalize
 * @return {array[int]} An array values 0 to 9 inclusive describing the state of the board.
 */
ISOLACE.sudoku.BoardState.prototype.normalize = function() {
    var stateArray = [];
    for(var i = 0; i < 81; i++) {
        var cell = this.state[i];
        if(cell < 0) {
            cell = 0;
        } if (cell > 9) {
            cell -= 9;
        }
        stateArray.push(cell);
    }

    return stateArray;
};

/**
 * Checks to see if the puzzle has been successfully solved.
 * 
 * @method solved
 * @param {Puzzle} puzzle The current Sudoku Puzzle.
 * @return {boolean} True if all cells have the correct guess.
 */
ISOLACE.sudoku.BoardState.prototype.solved = function(puzzle) {
    var stateArray = this.normalize();
    var solved = $SUDOKU_UTIL.solved(puzzle, stateArray);
    return solved;
};

/**
 * Determine if the value conflicts with other guess in the row, column or grid.
 * 
 * @method conflicts
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 * @return {boolean} If the value conflicts with other guess in the row, column or grid.
 */
ISOLACE.sudoku.BoardState.prototype.conflicts = function(value, index) {
    if(value === 0 || !this.isEditable(index) ) {
        return false;
    }
    assertInRange(value, 1, 9);
    assertInRange(index, 0, 80);
    var stateArray = this.normalize();

    return $SUDOKU_UTIL.conflicts(stateArray, value, index);
};

/**
 * After a successful guess remove markers with this value from grid.
 * @private
 * @method removeMarkersFromGrid
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardState.prototype.removeMarkersFromGrid = function(value, index) {
    var grid = $SUDOKU_UTIL.getGridFromIndex(index);
    var a = $SUDOKU_UTIL.getGridIndexes(grid);
    for(var i = 0; i < 9; i++) {
        var gridIndex = a[i];
        if(index == gridIndex) {
            continue;
        }
        var hasMarkerValue = this.hasMarkerValue(value, gridIndex);
        if(hasMarkerValue) {
            //  this will toggle the marker to off
            this.setMarkerValue(value, gridIndex);
            $Log.debug('Removed marker of value ' + value + ' from cell ' + gridIndex + '.');
        }
    }
};

/**
 * Set cell to value, if that value already exists remove it.
 * 
 * @method setValue
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardState.prototype.setValue = function(value, index) {
    assertInRange(value, 1, 9);
    assertInRange(index, 0, 80);
    var isEditable = this.isEditable(index);
    assertTrue(isEditable, "Can't set a value on a revealed cell.");
    if(this.state[index] == value) {
        $Log.debug('Clear index ' + index + ' of value ' + value);
        this.state[index] = 0;
    } else {
        this.state[index] = value;
        $Log.debug('Set index ' + index + ' to value ' + value);
    }
    this.removeMarkersFromGrid(value, index);
};

/**
 * Get the value at the given index.
 * 
 * @method getValue
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 * @return {int} Value of the cell at the given index, between 1 and 9 inclusive.
 */
ISOLACE.sudoku.BoardState.prototype.getValue = function(index) {
    assertInRange(index, 0, 80);
    if(this.isEditable(index)){
        return this.state[index];
    } else {
        return this.state[index] - 9;
    }
};

/**
 * Determine if the cell at the given index is editable (i.e. wasn't revealed
 * to the user).
 * 
 * @method isEditable
 * @return {boolean} True if the cell was not originally revealed.
 */
ISOLACE.sudoku.BoardState.prototype.isEditable = function(index) {
    assertInRange(index, 0, 80);
    return this.state[index] < 10;
};

/**
 * Determine if the cell at the given index contains one or more markers.
 * 
 * @method hasMarker
 * @return {boolean} True if the cell contains one or more markers.
 */
ISOLACE.sudoku.BoardState.prototype.hasMarker = function(index) {
    assertInRange(index, 0, 80);
    return this.state[index] < 0;
};

/**
 * Update cell value to reflect a new marker value, if that value
 * already exists remove it.
 * 
 * @method setMarkerValue
 * @private
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 */
ISOLACE.sudoku.BoardState.prototype.setMarkerValue = function(value, index) {
    assertInRange(value, 1, 9);
    assertInRange(index, 0, 80);
    var isEditable = this.isEditable(index);
    assertTrue(isEditable, "Can't set a marker on a revealed cell.");
    
    //  clear existing guess
    if(this.state[index] > 0) {
        this.state[index] = 0;
    }
    var mask = 1 <<  (value-1);
    if(this.hasMarkerValue(value, index)) {
        this.state[index] += mask;
        $Log.debug('Clear marker at index ' + index + ' with value ' + value);
    } else {
        this.state[index] -= mask;
        $Log.debug('Set marker at index ' + index + ' to value ' + value);
    }
};

/**
 * Determine if the cell at the given index has a marker of the given value.
 * 
 * @method hasMarkerValue
 * @param {int} value Value between 1 and 9 inclusive to check for.
 * @param {int} index Index (0 to 80 inclusive) of the cell to check.
 * @return {boolean} True if the cell at the given index has a marker of the given value.
 */
ISOLACE.sudoku.BoardState.prototype.hasMarkerValue = function(value, index) {
    assertInRange(value, 1, 9);
    assertInRange(index, 0, 80);
    if(this.hasMarker(index)) {
        var mask = 1 <<  (value-1);
        var has = (-1 * this.state[index]) & mask;
        return has;
    }
    return false;
};
