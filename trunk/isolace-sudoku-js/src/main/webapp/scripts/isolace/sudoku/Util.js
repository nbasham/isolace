ISOLACE.namespace("sudoku");

/**
 * @private
 * Defines utilities specific to Sudoku.
 * 
 * @class Util
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see $SUDOKU_UTIL
 */
ISOLACE.sudoku.Util = function() {
};

/**
 * Format seconds to mmm:ss.
 * @private
 * @method formatTime
 * @param {int} seconds The seconds to format.
 * @return Seconds formatted as mmm:ss.
 */
ISOLACE.sudoku.Util.prototype.formatTime = function(seconds) {
    var timeStr = '';
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    if(min < 10) {
        timeStr = '0' + min;
    } else {
        timeStr = '' + min;
    }
    timeStr += ':';
    if(sec < 10) {
        timeStr += '0' + sec;
    } else {
        timeStr += '' + sec;
    }
    
    return timeStr;
};

/**
 * Utility function to determine what row a given index resides in.
 * @private
 */
ISOLACE.sudoku.Util.prototype.getHintArray = function(value) {
    var a = [];
    for ( var i = 1; i <= 9; i++) {
        var mask = 1 <<  (i-1);
        var has = value & mask;
        if (has) {
            a.push(i);
        }
    }
    return a;
};

/**
 * Get the number of times each symbol is currently used.
 * 
 * @method getSymbolCount
 * @param {array[int]} 81 values (0 to 9).
 * @return {array[int]} An array with values from 0 to 9.
 */
ISOLACE.sudoku.Util.prototype.getSymbolCount = function(state) {
    var symbolCount = [0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < state.length; i++) {
        var value = state[i];
        if(value > 9) {
            value -= 9;
        }
        if(value > 0) {
            symbolCount[value-1]++;
        }
    }
    return symbolCount;
};

/**
 * Checks to see if the puzzle has been successfully solved.
 * 
 * @method solved
 * @param {Puzzle} Current Sudoku puzzle.
 * @param {array[int]} 81 values (0 to 9).
 * @return {boolean} True if all cells have the correct guess.
 */
ISOLACE.sudoku.Util.prototype.solved = function(puzzle, state) {
    var answers = puzzle.getValues();
    for(var i = 0; i < 81; i++) {
        if(state[i] != answers[i]) {
            //window.console.log('wrong answer at index: ' + i + ' got '  + solution[i] + ' expected ' + answer[i] + '.');
            return false;
        }
    }
    return true;
};

/**
 * Determine if the value conflicts with other guess in the row, column or grid.
 * 
 * @method conflicts
 * @param {array[int]} 81 values (0 to 9).
 * @param {int} value (1 to 9).
 * @param {int} index of the cell.
 * @return {boolean} If the value conflicts with other guess in the row, column or grid.
 */
ISOLACE.sudoku.Util.prototype.conflicts = function(state, value, index) {
    if(value === 0) {
        return false;
    }
    var uir = $SUDOKU_UTIL.uniqueInRow(state, value, index);
    if(!uir) {
        return true;
    }
    var uic = $SUDOKU_UTIL.uniqueInCol(state, value, index);
    if(!uic) {
        return true;
    }
    var uig = $SUDOKU_UTIL.uniqueInGrid(state, value, index);
    if(!uig) {
        return true;
    }
    return false;
};

/**
 * Utility function to determine what row a given index resides in.
 * @private
 */
ISOLACE.sudoku.Util.prototype.getRowFromIndex = function(index) {
    var i = index / 9;
    return Math.floor(i);
};

/**
 * Utility function to determine what col a given index resides in.
 * @private
 */
ISOLACE.sudoku.Util.prototype.getColFromIndex = function(index) {
    var i = index % 9;
    return i;
};

/**
 * Utility function to determine what grid a given index resides in.
 * @private
 */
ISOLACE.sudoku.Util.prototype.getGridFromIndex = function(index) {
    var row = $SUDOKU_UTIL.getRowFromIndex(index);
    var r = 0;
    if(row > 5) {
        r = 2;
    } else if (row > 2) {
        r = 1;
    }
    var col = $SUDOKU_UTIL.getColFromIndex(index);
    var c = 0;
    if(col > 5) {
        c = 2;
    } else if (col > 2) {
        c = 1;
    }
    var grid = r*3+c;
    //ISOLACE.log('index: ' + index + ' row: ' + r + ' col: ' + c + ' grid: ' + grid);
    
    return grid;
};

/**
 * Utility function to determine the array of grid indexes associated with a given grid.
 * @private
 */
ISOLACE.sudoku.Util.prototype.getGridIndexes = function(gridIndex) {
    var grid0Index = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    var gridStartIndexs = [0, 3, 6, 27, 30, 33, 54, 57, 60];
    var indexes = [];
    
    for(var i = 0; i < 9; i++) {
        indexes.push(grid0Index[i] + gridStartIndexs[gridIndex]);
    }
    
    return indexes;
};

/**
 * Utility function to determine if the value is unique in it's row.
 * @private
 * @param {array[int]} 81 values (0 to 9).
 * @param {int} value (1 to 9).
 * @param {int} index of the cell.
 * @return {boolean} If the value conflicts with other guess in the row.
 */
ISOLACE.sudoku.Util.prototype.uniqueInRow = function(state, value, index) {
    var row = $SUDOKU_UTIL.getRowFromIndex(index);
    var startIndex = row * 9;
    for(var i = 0; i < 9; i++) {
        if(index == startIndex + i) {
            continue;
        }
        var currValue = state[startIndex + i];
        if(value == currValue) {
            return false;
        }
    }
    return true;
};

/**
 * Utility function to determine if the value is unique in it's col.
 * @private
 * @param {array[int]} 81 values (0 to 9).
 * @param {int} value (1 to 9).
 * @param {int} index of the cell.
 * @return {boolean} If the value conflicts with other guess in the column.
 */
ISOLACE.sudoku.Util.prototype.uniqueInCol = function(state, value, index) {
    var col = $SUDOKU_UTIL.getColFromIndex(index);
    for(var i = col; i < 81; i += 9) {
        if(index == i) {
            continue;
        }
        var currValue = state[i];
        if(value == currValue) {
            return false;
        }
    }
    return true;
};

/**
 * Utility function to determine if the value is unique in it's grid.
 * @private
 * @param {array[int]} 81 values (0 to 9).
 * @param {int} value (1 to 9).
 * @param {int} index of the cell.
 * @return {boolean} If the value conflicts with other guess in the grid.
 */
ISOLACE.sudoku.Util.prototype.uniqueInGrid = function(state, value, index) {
    var grid = $SUDOKU_UTIL.getGridFromIndex(index);
    var a = $SUDOKU_UTIL.getGridIndexes(grid);
    //ISOLACE.log('gridIndexes: ' + a);
    for(var i = 0; i < 9; i++) {
        if(index == a[i]) {
            continue;
        }
        var currValue = state[a[i]];
        if(value == currValue) {
            return false;
        }
    }
    return true;
};

if (typeof $SUDOKU_UTIL === undefined || !$SUDOKU_UTIL) {
       /**
        * A singleton instance of ISOLACE.sudoku.Util automatically
        * created as a convenience so $SUDOKU_UTIL can be used instead of
        * ISOLACE.sudoku.Util.
        * @class ISOLACE.sudoku.Util
        * @static
        */
       var $SUDOKU_UTIL = new ISOLACE.sudoku.Util();
}