ISOLACE.namespace("sudoku");

/**
 * sudoku.service provides all game logic required to implement Sudoku.
 * 
 * $s is automatically instantiated for convenient access to ISOLACE.sudoku.service.
 * 
 * <pre>
 * Example usage:
 *        var problem = [8,6,4,5,3,1,2,9,7,9,5,1,6,2,7,8,4,3,2,7,3,4,8,9,6,1,5,1,4,7,9,5,6,3,8,2,3,9,6,2,4,8,5,7,1,5,8,2,1,7,3,9,6,4,6,2,5,8,1,4,7,3,9,7,1,9,3,6,5,4,2,8,4,3,8,7,9,2,1,5,6];
 *        var mask = [2,7,11,12,15,18,21,23,26,29,31,34,35,36,39,40,44,45,46,49,51,54,56,60,62,64,67,68,73,77,78];
 *        $s.initialize(problem, mask);
 * </pre>
 * 
 * @class service
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.service = function() {
	var answer;
	var revealedIndexes;
	var solution = [];
	var selectedIndex = -1;
	
	function a(i){
		alert(i);
	}
};

/**
 * Initialize the Sudoku service. This is done when starting a new game.
 * 
 * @method initialize
 * @exception Invalid problem
 * @exception Invalid mask
 */
ISOLACE.sudoku.service.prototype.initialize = function(problem, mask) {
	if (problem === undefined || problem.length != 81) {
		throw new Exception("Invalid problem");
	}
	if (mask === undefined) {
		throw new Exception("Invalid mask");
	}
	answer = problem;
	revealedIndexes = mask;
	// window.console.log('revealedIndexes: ' + revealedIndexes);
	solution = [];
	for ( var i = 0; i < problem.length; i++) {
		solution.push(0);
		if ($.inArray(i, mask) != -1) {
			solution[i] = problem[i];
		}
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
ISOLACE.sudoku.service.prototype.getSolution = function(index) {
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
ISOLACE.sudoku.service.prototype.guess = function(index, value) {

	if($.inArray(index, revealedIndexes) == -1) {
		if(solution[index] == value) {
			window.console.log('Index set to 0');
			solution[index] = 0;
		} else {
			solution[index] = value;
			window.console.log('Index set to ' + value);
			//	after a successful guess remove hints with this value from grid
			var grid = $s.getGridFromIndex(index);
			window.console.log('Checking grid ' + grid + ' to see if any hints of value ' + value + ' exist.');
			var a = $s.getGridIndexes(grid);
			window.console.log('Grid indexes: ' + a);
			for(var i = 0; i < 9; i++) {
				if(index == a[i]) {
					continue;
				}
				var valueAsHintInGrid = this.hasHint(a[i], value);
				window.console.log('Cell ' + [i] + ' value ' + value + ' result: ' + valueAsHintInGrid);
				if(valueAsHintInGrid) {
					this.setHint(a[i], value);
					window.console.log('Removed hint of value ' + value + ' from cell ' + a[i] + '.');

				}
			}

		}
	} else {
		window.console.log('Index ' + index + ' is a revealed index so ignoring this guess.');
	}
};

/**
 * Determine if the cell specified by index already contains hint value.
 * 
 * @param {int} index of the cell.
 * @param {int} hint value (1 to 9).
 * @method hasHint
 * @return {boolean} If true if the cell of index already has hint of value
 */
ISOLACE.sudoku.service.prototype.hasHint = function(index, value) {

	if(solution[index] >= 0) {
		return false;
	}
	var mask = 1 <<  (hint-1);
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
ISOLACE.sudoku.service.prototype.setHint = function(index, value) {
	if($.inArray(index, revealedIndexes) != -1) {
		window.console.log('revealed index: ' + index);
		return;
	}
	if(solution[index] > 0) {
		solution[index] = 0;
	}
	var hintValue = 1 <<  (hintValue-1);
	if(this.hasHint(index, hintValue)) {
		solution[index] += hintValue;
		window.console.log('Cleared hint value because it already existed.');
	} else {
		solution[index] -= hintValue;
		//window.console.log('setHint() hint: ' + value + ' solution: ' + solution[index] + ' value: ' + (-1 * value));
	}
};

/**
 * Utility function to determine what row a given index resides in.
 * @private
 */
ISOLACE.sudoku.service.prototype.getRowFromIndex = function(index) {
	var i = index / 9;
	return Math.floor(i);
};

/**
 * Utility function to determine what col a given index resides in.
 * @private
 */
ISOLACE.sudoku.service.prototype.getColFromIndex = function(index) {
	var i = index % 9;
	return i;
};

/**
 * Utility function to determine what grid a given index resides in.
 * @private
 */
ISOLACE.sudoku.service.prototype.getGridFromIndex = function(index) {
	var row = $s.getRowFromIndex(index);
	var r = 0;
	if(row > 5) {
		r = 2;
	} else if (row > 2) {
		r = 1;
	}
	var col = $s.getColFromIndex(index);
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
ISOLACE.sudoku.service.prototype.getGridIndexes = function(gridIndex) {
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
ISOLACE.sudoku.service.prototype.uniqueInRow = function(solution, index, value) {
	var row = $s.getRowFromIndex(index);
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
ISOLACE.sudoku.service.prototype.uniqueInCol = function(solution, index, value) {
	var col = $s.getColFromIndex(index);
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
ISOLACE.sudoku.service.prototype.uniqueInGrid = function(solution, index, value) {
	var grid = $s.getGridFromIndex(index);
	var a = $s.getGridIndexes(grid);
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

if (typeof $s == "undefined" || !$s) {
	   /**
	    * A singleton instance of ISOLACE.sudoku.service automatically
	    * created as a convenience so $s can be used instead of
	    * ISOLACE.sudoku.service.
	    * @class ISOLACE.sudoku.service
	    * @static
	    */
	   var $s = new ISOLACE.sudoku.service();
}

