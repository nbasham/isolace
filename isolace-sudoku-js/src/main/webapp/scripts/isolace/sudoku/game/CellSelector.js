ISOLACE.namespace("sudoku");

/**
 * Implements logic for cell selection and navigation.
 * 
 * @class CellSelector
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */

ISOLACE.sudoku.CellSelector = function(puzzle) {
    this.SKIP_REVEALED = false;
    this.reset(puzzle);
    $GameEvent.handleSelectCell(this, this.handleSelectCell);
    $GameEvent.handleSelectCellUp(this, this.handleSelectCellUp);
    $GameEvent.handleSelectCellDown(this, this.handleSelectCellDown);
    $GameEvent.handleSelectCellLeft(this, this.handleSelectCellLeft);
    $GameEvent.handleSelectCellRight(this, this.handleSelectCellRight);
};
ISOLACE.sudoku.CellSelector.prototype.reset = function(puzzle) {
    this.puzzle = puzzle;
    this.selectedIndex = 0;
};
/**
 * Represents a cell being selected by adding a image.
 * 
 * @method select
 * @param {number} cellIndex The index of the cell to select.
 */
ISOLACE.sudoku.CellSelector.prototype.select = function(cellIndex) {
    $Renderer.renderSelector(cellIndex);
};
/**
 * Not required because select moves the image from the previously selected cell.
 * 
 * @method unselect
 * @param {number} cellIndex The index of the cell to unselect.
 */
ISOLACE.sudoku.CellSelector.prototype.unselect = function(cell, cellIndex) {
};
ISOLACE.sudoku.CellSelector.prototype.getIndex = function() {
    return this.selectedIndex;
};
ISOLACE.sudoku.CellSelector.prototype.handleSelectCell = function(index) {
    this.selectedIndex = index;
    $Renderer.renderSelector(this.selectedIndex);
};
ISOLACE.sudoku.CellSelector.prototype.handleSelectCellUp = function() {
    this.selectedIndex = this.dec(this.selectedIndex, 9);
    $Renderer.renderSelector(this.selectedIndex);
};
ISOLACE.sudoku.CellSelector.prototype.handleSelectCellDown = function() {
    this.selectedIndex = this.inc(this.selectedIndex, 9);
    $Renderer.renderSelector(this.selectedIndex);
};
ISOLACE.sudoku.CellSelector.prototype.handleSelectCellLeft = function() {
    this.selectedIndex = this.dec(this.selectedIndex, 1);
    $Renderer.renderSelector(this.selectedIndex);
};
ISOLACE.sudoku.CellSelector.prototype.handleSelectCellRight = function() {
    this.selectedIndex = this.inc(this.selectedIndex, 1);
    $Renderer.renderSelector(this.selectedIndex);
};
/**
 * Increment value to the amount and mod at 81.
 * @method inc
 * @private
 * @param {int} value Initial value.
 * @param {int} amount Amount to increment by.
 * @return Incremented value.
 * @type {int}
 */
ISOLACE.sudoku.CellSelector.prototype.inc = function(value, amount) {
    var newIndex;
    do {
        value += amount;
        if (value < 81) {
            newIndex = value;
        } else {
            newIndex = Math.abs(81 - value);
        }
    } while(!this.puzzle.isEditable(newIndex) && this.SKIP_REVEALED);
    return newIndex;
};

/**
 * Decrement value to the amount and mod at 0.
 * @method dec
 * @private
 * @param {int} value Initial value.
 * @param {int} amount Amount to decrement by.
 * @return Decremented value.
 * @type {int}
 */
ISOLACE.sudoku.CellSelector.prototype.dec = function(value, amount) {
    var newIndex;
    do {
        value -= amount;
        if(value >= 0) {
            newIndex = value;
        } else {
            newIndex = 81 + value;
        }
    } while(!this.puzzle.isEditable(newIndex) && this.SKIP_REVEALED);
    return newIndex;
};
