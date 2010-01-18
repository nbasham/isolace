ISOLACE.namespace("sudoku");

/**
 * sudoku.logic provides all game logic required to implement Sudoku.
 * 
 * <pre>
 * Example usage:
 *        var problem = [8,6,4,5,3,1,2,9,7,9,5,1,6,2,7,8,4,3,2,7,3,4,8,9,6,1,5,1,4,7,9,5,6,3,8,2,3,9,6,2,4,8,5,7,1,5,8,2,1,7,3,9,6,4,6,2,5,8,1,4,7,3,9,7,1,9,3,6,5,4,2,8,4,3,8,7,9,2,1,5,6];
 *        var mask = [2,7,11,12,15,18,21,23,26,29,31,34,35,36,39,40,44,45,46,49,51,54,56,60,62,64,67,68,73,77,78];
 *        $logic.initialize(problem, mask);
 * </pre>
 * 
 * @class logic
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see $logic
 */
ISOLACE.sudoku.logic = function() {
	this.answer = undefined;
	this.revealedIndexes = undefined;
	this.solution = undefined;
	this.currentIndex = -1;
};

/**
 * Determine if the value conflicts with other guess in the row, column or grid.
 * 
 * @param {int} index of the cell.
 * @param {int} value (1 to 9).
 * @method conflicts
 * @return {boolean} If the value conflicts with other guess in the row, column or grid.
 */
ISOLACE.sudoku.logic.prototype.conflicts = function(index, value) {
    if(value === 0) {
        return false;
    }
	var uir = $logic.uniqueInRow(solution, index, value);
	if(!uir) {
		return true;
	}
	var uic = $logic.uniqueInCol(solution, index, value);
	if(!uic) {
		return true;
	}
	var uig = $logic.uniqueInGrid(solution, index, value);
	if(!uig) {
		return true;
	}
	return false;
};

/**
 * Initialize the Sudoku logic. This is done when starting a new game.
 * 
 * @param problem The 81 int array representing the Sudoku puzzle.
 * @param mask The int array describing which indexes will be revealed.
 * @param {optional} existingSolution If restoring a previously played
 *          game, existingSolution is the previous state.
 * @method initialize
 * @exception Invalid problem
 * @exception Invalid mask
 */
ISOLACE.sudoku.logic.prototype.initialize = function(problem, mask, existingSolution) {
	if (problem === undefined || problem.length != 81) {
		throw new Exception("Invalid problem");
	}
	if (mask === undefined) {
		throw new Exception("Invalid mask");
	}
	answer = problem;
	revealedIndexes = mask;
	// window.console.log('revealedIndexes: ' + revealedIndexes);
    if (this.solution === undefined) {
        solution = [];
        for ( var i = 0; i < problem.length; i++) {
            solution.push(0);
            if ($.inArray(i, mask) != -1) {
                solution[i] = problem[i];
            }
        }
    } else {
        solution = existingSolution;
    }
};

/**
 * Get the solution array or int of a given index.
 * 
 * @param {int optional} index specifies the index of the returned value.
 * @method getSolution
 * @return {array | int} If index is undefined return an 81 int array defining
 *         the current board state, else return the int value specified by
 *         index.
 * @exception Invalid solution
 */
ISOLACE.sudoku.logic.prototype.getSolution = function(index) {
	if (solution === undefined || solution.length != 81) {
		throw new Exception("Invalid solution");
	}
	if (index === undefined) {
		return solution;
	} else {
		return solution[index];
	}
};

/**
 * Called when the user attempts a guess on a cell.
 * 
 * @param {int} index of the cell.
 * @param {int} guess value (1 to 9).
 * @method guess
 */
ISOLACE.sudoku.logic.prototype.guess = function(index, value) {

	if($.inArray(index, revealedIndexes) == -1) {
		if(solution[index] == value) {
			//window.console.log('Index set to 0');
			solution[index] = 0;
		} else {
			solution[index] = value;
			//window.console.log('Index set to ' + value);
			//	after a successful guess remove hints with this value from grid
			var grid = $logic.getGridFromIndex(index);
			//window.console.log('Checking grid ' + grid + ' to see if any hints of value ' + value + ' exist.');
			var a = $logic.getGridIndexes(grid);
			//window.console.log('Grid indexes: ' + a);
			for(var i = 0; i < 9; i++) {
				if(index == a[i]) {
					continue;
				}
				var valueAsHintInGrid = this.hasHint(a[i], value);
				//window.console.log('Cell ' + [i] + ' value ' + value + ' result: ' + valueAsHintInGrid);
				if(valueAsHintInGrid) {
					this.setHint(a[i], value);
					//window.console.log('Removed hint of value ' + value + ' from cell ' + a[i] + '.');

				}
			}

		}
		//$undo.add($logic.getState());
	} else {
		//window.console.log('Index ' + index + ' is a revealed index so ignoring this guess.');
	}
};

/**
 * Determine if the cell specified by index already contains hint value. If
 * no hint value is specified, returns true if the cell contains one or more
 * hints.
 * 
 * @param {int} index of the cell.
 * @param {int optional} hint value (1 to 9).
 * @method hasHint
 * @return {boolean} If true if the cell of index already has hint of value
 */
ISOLACE.sudoku.logic.prototype.hasHint = function(index, value) {
    //window.console.log('index=' + index + " value=" + value);
	if(solution[index] >= 0) {
		return false;
	}
	if(value === undefined) {
	    return solution[index] < 0;
	}
	var mask = 1 <<  (value-1);
	var has = (-1 * solution[index]) & mask;
	//window.console.log('mask: ' + mask + ' solution: ' + (solution[index]) + ' &: ' + has);
	return has !== 0;
};


/**
 * Determine if the cell specified by index already contains value.
 * 
 * @param {int} index of the cell.
 * @param {int} hint value (1 to 9).
 * @method hasHint
 * @return {boolean} If true if the cell of index already has hint of value
 */
ISOLACE.sudoku.logic.prototype.setHint = function(index, value) {
	if($.inArray(index, revealedIndexes) != -1) {
		//window.console.log('revealed index: ' + index);
		return;
	}
	if(solution[index] > 0) {
		solution[index] = 0;
	}
	var hintValue = 1 << (value-1);
	if(this.hasHint(index, value)) {
		solution[index] += hintValue;
		//window.console.log('Cleared hint value because it already existed.');
	} else {
		solution[index] -= hintValue;
		//window.console.log('setHint() hint: ' + value + ' solution: ' + solution[index] + ' value: ' + (-1 * value));
	}
    //$undo.add($logic.getState());
};

/**
 * Was the cell at the given index revealed to the user. Recall the board
 * starts of with some cells revealed to the user.
 * 
 * @param {int} index of the cell.
 * @method revealed
 * @return {boolean} If true if  this cell was revealed to the user.
 */
ISOLACE.sudoku.logic.prototype.revealed = function(index) {
	var r = $.inArray(index, revealedIndexes) != -1;
	return r;
};

/**
 * Sets or gets the currently selected index.
 * 
 * @param {int} Index of the cell when setting, no parameter passed when getting.
 * @method selectedIndex
 * @return {int} index of the cell when getting, nothing returned when setting.
 */
ISOLACE.sudoku.logic.prototype.selectedIndex = function(index) {
	if(index === undefined) {
		return this.currentIndex;
	} else {
	    this.currentIndex = index;
	}
};

/**
 * Checks to see if the puzzle has been successfully solved.
 * 
 * @method solved
 * @return {boolean} True if all cells have the correct guess.
 */
ISOLACE.sudoku.logic.prototype.solved = function() {
	for(var i = 0; i < 81; i++) {
		if(solution[i] != answer[i]) {
			//window.console.log('wrong answer at index: ' + i + ' got '  + solution[i] + ' expected ' + answer[i] + '.');
			return false;
		}
	}
	return true;
};

/**
 * Utility function to get an object that describes the current state of the game.
 * @private
 */
ISOLACE.sudoku.logic.prototype.getState = function() {
    var state = {};
    state.answer = this.answer;
    state.revealedIndexes = this.revealedIndexes;
    state.solution = this.solution;

    return state;
};

/**
 * Utility function to determine what row a given index resides in.
 * @private
 */
ISOLACE.sudoku.logic.prototype.getRowFromIndex = function(index) {
    var i = index / 9;
    return Math.floor(i);
};

/**
 * Utility function to determine what col a given index resides in.
 * @private
 */
ISOLACE.sudoku.logic.prototype.getColFromIndex = function(index) {
	var i = index % 9;
	return i;
};

/**
 * Utility function to determine what grid a given index resides in.
 * @private
 */
ISOLACE.sudoku.logic.prototype.getGridFromIndex = function(index) {
	var row = $logic.getRowFromIndex(index);
	var r = 0;
	if(row > 5) {
		r = 2;
	} else if (row > 2) {
		r = 1;
	}
	var col = $logic.getColFromIndex(index);
	var c = 0;
	if(col > 5) {
		c = 2;
	} else if (col > 2) {
		c = 1;
	}
	var grid = r*3+c;
	//window.console.log('index: ' + index + ' row: ' + r + ' col: ' + c + ' grid: ' + grid);
	
	return grid;
};

/**
 * Utility function to determine the array of grid indexes associated with a given grid.
 * @private
 */
ISOLACE.sudoku.logic.prototype.getGridIndexes = function(gridIndex) {
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
 */
ISOLACE.sudoku.logic.prototype.uniqueInRow = function(solution, index, value) {
	var row = $logic.getRowFromIndex(index);
	var startIndex = row * 9;
	for(var i = 0; i < 9; i++) {
		if(index == startIndex + i) {
			continue;
		}
		var currValue = solution[startIndex + i];
		if(value == currValue) {
			return false;
		}
	}
	return true;
};

/**
 * Utility function to determine if the value is unique in it's col.
 * @private
 */
ISOLACE.sudoku.logic.prototype.uniqueInCol = function(solution, index, value) {
	var col = $logic.getColFromIndex(index);
	for(var i = col; i < 81; i += 9) {
		if(index == i) {
			continue;
		}
		var currValue = solution[i];
		if(value == currValue) {
			return false;
		}
	}
	return true;
};

/**
 * Utility function to determine if the value is unique in it's grid.
 * @private
 */
ISOLACE.sudoku.logic.prototype.uniqueInGrid = function(solution, index, value) {
	var grid = $logic.getGridFromIndex(index);
	var a = $logic.getGridIndexes(grid);
	//window.console.log('gridIndexes: ' + a);
	for(var i = 0; i < 9; i++) {
		if(index == a[i]) {
			continue;
		}
		var currValue = solution[a[i]];
		if(value == currValue) {
			return false;
		}
	}
	return true;
};

if (typeof $logic == "undefined" || !$logic) {
	   /**
	    * A singleton instance of ISOLACE.sudoku.logic automatically
	    * created as a convenience so $logic can be used instead of
	    * ISOLACE.sudoku.logic.
	    * @class ISOLACE.sudoku.logic
	    * @static
	    */
	   var $logic = new ISOLACE.sudoku.logic();
}

