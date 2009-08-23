ISOLACE.namespace("sudoku.ui.selection");

/**
 * Implements background selection for Sudoku User Interface.
 * 
 * @class background
 * @namespace ISOLACE.sudoku.ui.selection
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see ISOLACE.sudoku.ui
 */
ISOLACE.sudoku.ui.selection.background = function() {
};

/**
 * Remove selection decoration from cell.
 * 
 * @param {int} Index of cell to remove decoration from.
 * @method removeSelectionDecoration
 */
ISOLACE.sudoku.ui.selection.background.prototype.removeSelectionDecoration = function(cell, index) {
    cell.removeClass('selectedCell');
};

/**
 * Add selection decoration to cell.
 * 
 * @param {int} Index of cell to decorate.
 * @method addSelectionDecoration
 */
ISOLACE.sudoku.ui.selection.background.prototype.addSelectionDecoration = function(cell, index) {
    cell.addClass('selectedCell');
};

if (typeof $selectioner === "undefined" || !$selectioner) {
       /**
        * A singleton instance of ISOLACE.sudoku.ui.selection.background automatically
        * created as a convenience so $selectioner can be used instead of
        * ISOLACE.sudoku.ui.selection.background.
        * @class ISOLACE.sudoku.ui.selection.background
        * @static
        */
       var $selectioner = new ISOLACE.sudoku.ui.selection.background();
}
