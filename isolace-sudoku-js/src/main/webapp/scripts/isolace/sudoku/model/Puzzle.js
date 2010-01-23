ISOLACE.namespace("sudoku");

/**
 * Puzzle defines the values of each cell of a  Sudoku game. It also defines
 * which cells are revealed to the user at the start of the game. Immutable.
 * 
 * <pre>
 * Example usage:
 *        var values = [8,6,4,5,3,1,2,9,7,9,5,1,6,2,7,8,4,3,2,7,3,4,8,9,6,1,5,1,4,7,9,5,6,3,8,2,3,9,6,2,4,8,5,7,1,5,8,2,1,7,3,9,6,4,6,2,5,8,1,4,7,3,9,7,1,9,3,6,5,4,2,8,4,3,8,7,9,2,1,5,6];
 *        var revealedIndexes = [2,7,11,12,15,18,21,23,26,29,31,34,35,36,39,40,44,45,46,49,51,54,56,60,62,64,67,68,73,77,78];
 *        var puzzle = new ISOLACE.sudoku.Puzzle(values, revealedIndexes);
 * </pre>
 * 
 * @class Puzzle
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.Puzzle = function(values, revealedIndexes) {
    this.values = values;
    this.revealedIndexes = revealedIndexes;
};

/**
 * Gets the puzzle values.
 * 
 * @method getValues
 * @return {int[]} The puzzle values.
 */
ISOLACE.sudoku.Puzzle.prototype.getValues = function() {
    return this.values;
};

/**
 * Gets the puzzle value for a given index.
 * 
 * @param {int} index of the cell.
 * @method getValue
 * @return {int} The puzzle value at the given index.
 */
ISOLACE.sudoku.Puzzle.prototype.getValue = function(index) {
    return this.values[index];
};

/**
 * Determines if the cell at the specified index is editable. Cells revealed to the user
 * at the start of a game are not editable.
 * 
 * @param {int} index of the cell.
 * @method isEditable
 * @return {boolean} True if the cell at the given index is a revealed cell, false otherwise.
 */
ISOLACE.sudoku.Puzzle.prototype.isEditable = function(index) {
    var isEditable = $.inArray(index, this.revealedIndexes) == -1;
    return isEditable;
};

/**
 * Gets the initial State for a given puzzle. Returns an int[81]
 * array that has either values from  10 to 18 at the revealed indexes or
 * values of 0 at the remaining indexes to be guessed at.
 * 
 * @method getInitialState
 * @return {int[]} The initial State of this puzzle. An int[81]
 * with 0 values except for the initially revealed values.
 */
ISOLACE.sudoku.Puzzle.prototype.getInitialState = function() {
    var state = [];
    var values = this.getValues();
    for(var i = 0; i < 81; i++) {
        state.push(0);
        if(!this.isEditable(i)) {
            state[i] = values[i] + 9;
        }
    }
    return state;
};