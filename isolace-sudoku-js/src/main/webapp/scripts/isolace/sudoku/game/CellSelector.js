ISOLACE.namespace("sudoku");

/**
 * Implements selecting a cell using a image.
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
    this.selectedIndex = undefined;
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

/**
 * Represents a cell being selected by adding a image.
 * 
 * @method select
 */
ISOLACE.sudoku.CellSelector.prototype.select = function(index) {
    if(this.selector === undefined) {
        this.createSelectorElement();
    }
    var cell = $('#c' + index);
    var t = cell.offset().top;
    var l = cell.position().left;
    this.selector.css('top', t);
    this.selector.css('left', l);
    this.selector.css('display', 'block');

    this.marker.css('top', t + 16);
    this.marker.css('left', l + 16);
};

/**
 * Not required because select moves the image from the previously selected cell.
 * 
 * @method unselect
 */
ISOLACE.sudoku.CellSelector.prototype.unselect = function(cell, index) {
};


/**
 * Create selector HTMLELement.
 * @private
 * @method createSelectorElement
 */
ISOLACE.sudoku.CellSelector.prototype.createSelectorElement = function() {
    this.selector = $('<img/>', {
        src: '../images/45/numbers/select.png',
        id: 'selector'
    }).appendTo('.board');
    this.marker = $('<div/>', {
        id: 'selectorMarker',
        'class': 'ui-icon ui-icon-pencil fiftyPercent'
    }).appendTo('.board').hide();
};

/**
 * Handle a toggle mark mode event.
 * 
 * @method handleToggleMarkMode
 */
ISOLACE.sudoku.CellSelector.prototype.handleToggleMarkMode = function() {
    this.markMode = !this.markMode;
    if(this.markMode) {
        this.marker.css('display', 'block');
    } else {
        this.marker.css('display', 'none');
    }
};