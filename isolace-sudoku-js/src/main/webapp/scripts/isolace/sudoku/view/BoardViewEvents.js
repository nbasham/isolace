ISOLACE.namespace("sudoku");

/**
 * Handles events for the board panel (e.g. number key or arrow key).
 * 
 * @class BoardViewEvents
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */

ISOLACE.sudoku.BoardViewEvents = function(selector, puzzle) {
    this.KEY_RETURN = 13;
    this.KEY_TAB = 9;
    this.KEY_BACKSPACE = 8;
    this.KEY_LEFT_ARROW = 37;
    this.KEY_RIGHT_ARROW = 39;
    this.KEY_UP_ARROW = 38;
    this.KEY_DOWN_ARROW = 40;
    /**
     * 1 to 9 inclusive including key pad
     */
    this.KEY_NUMBERS = [49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105];
    /**
     * don't map properly on Mac
     */
    this.KEY_FUNCTION_NUMBERS = [112,113,114,115,116,117,118,119,120];
    this.selector = selector;
    this.selectedCellIndex = -1;
    
    var me = this;
    $('.cell').each( function(i, el) {
        var editable = puzzle.isEditable(i);
        if (editable) {
            $(el).bind("mouseenter", {
                index :i,
                me: me
            }, me.handleSelectEvent);
            $(el).bind("mouseleave", {
                index :i,
                me: me
            }, me.handleUnselectEvent);
        }
    });
    this.mapKeysToEvents();
};

/**
 * Map keys to event handlers. In the future it might be nice
 * to provide the user with a UI to map the keys.
 * 
 * @method mapKeysToEvents
 */
ISOLACE.sudoku.BoardViewEvents.prototype.mapKeysToEvents = function() {
    this.setupKeyHandler(this.mark.bind(this), { shift: true, keys: this.KEY_NUMBERS});
    this.setupKeyHandler(this.guess.bind(this), { shift: false, keys: this.KEY_NUMBERS});
    this.setupKeyHandler(this.moveLeft.bind(this), {keys: this.KEY_LEFT_ARROW});
    this.setupKeyHandler(this.moveLeft.bind(this), { shift: true, keys: this.KEY_TAB});
    this.setupKeyHandler(this.moveRight.bind(this), {keys: [this.KEY_TAB, this.KEY_RIGHT_ARROW]});
    this.setupKeyHandler(this.moveUp.bind(this), {keys: this.KEY_UP_ARROW});
    this.setupKeyHandler(this.moveUp.bind(this), { shift: true, keys: this.KEY_RETURN});
    this.setupKeyHandler(this.moveDown.bind(this), {keys: [this.KEY_RETURN, this.KEY_DOWN_ARROW]});
    this.setupKeyHandler(jQuery.noop, {keys: this.KEY_BACKSPACE});
};

ISOLACE.sudoku.BoardViewEvents.prototype.guess = function(value) {
    $GameEvent.fireGuess(value, this.selectedCellIndex);
};

ISOLACE.sudoku.BoardViewEvents.prototype.mark = function(value) {
    $GameEvent.fireMark(value, this.selectedCellIndex);
};

/**
 * @private
 * Attach a function to a key event. Events
 * are not propagated. Implementation introduces
 * a YUI dependency.
 * 
 * @param {function} Function to call on key event.
 * @param {object} Key values to map.
 * @method setupKeyHandler
 */
ISOLACE.sudoku.BoardViewEvents.prototype.setupKeyHandler = function(f, keys) {
    var handler = function(type, args, obj) {
        //YAHOO.util.Event.stopEvent(args[1]);
        f(args[0] - 48);
    };
    var listener = new YAHOO.util.KeyListener(document, keys, handler);
    listener.enable();
};

/**
 * @private
 * Select the cell to the left of the currently selected cell.
 * 
 * @method moveLeft
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveLeft = function() {
    this.selectedCellIndex = this.dec(this.selectedCellIndex, 1);
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell to the left of the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveLeftToNextOpen
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveLeftToNextOpen = function() {
    this.selectedCellIndex = this.dec(this.selectedCellIndex, 1);
    while(this.sudokuLogic.revealed(this.selectedCellIndex)) {
        this.selectedCellIndex = this.dec(this.selectedCellIndex, 1);
    }
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell above the currently selected cell.
 * 
 * @method moveUp
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveUp = function() {
    this.selectedCellIndex = this.dec(this.selectedCellIndex, 9);
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell above the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveUpToNextOpen
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveUpToNextOpen = function() {
    this.selectedCellIndex = this.dec(sel, 9);
    while(this.sudokuLogic.revealed(this.selectedCellIndex)) {
        this.selectedCellIndex = this.dec(this.selectedCellIndex, 9);
    }
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell to the right of the currently selected cell.
 * 
 * @method moveRight
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveRight = function() {

    this.selectedCellIndex = this.inc(this.selectedCellIndex, 1);
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell to the right of the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveRightToNextOpen
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveRightToNextOpen = function() {
    this.selectedCellIndex = this.inc(this.selectedCellIndex, 1);
    while(this.sudokuLogic.revealed(this.selectedCellIndex)) {
        this.selectedCellIndex = this.inc(sel, 1);
    }
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell below the currently selected cell.
 * 
 * @method moveDown
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveDown = function() {
    this.selectedCellIndex = this.inc(this.selectedCellIndex, 9);
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * Select the cell below the currently selected cell,
 * skipping revealed cells.
 * 
 * @method moveDownToNextOpen
 */
ISOLACE.sudoku.BoardViewEvents.prototype.moveDownToNextOpen = function() {
    this.selectedCellIndex = this.inc(this.selectedCellIndex, 9);
    while(this.sudokuLogic.revealed(this.selectedCellIndex)) {
        this.selectedCellIndex = this.inc(this.selectedCellIndex, 9);
    }
    this.selector.select(this.selectedCellIndex);
};

/**
 * @private
 * This function doesn't do anything, it exists for code readability
 * and to map a do nothing function in a consistent manner. By
 * default we map the backspace key to <code>ignore</code> so that
 * the user doesn't inadvertently refresh the page when attempting to
 * clear a cell.
 * 
 * @method ignore
 */
ISOLACE.sudoku.BoardViewEvents.prototype.ignore = function() {
};
/**
 * Increment value to the amount and mod at 81. Private
 * utility used by moveXXX functions;
 * 
 * @private
 * @param {int} Initial value.
 * @param {int} Amount to increment by.
 * @method inc
 * @return {int} Incremented value.
 */
ISOLACE.sudoku.BoardViewEvents.prototype.inc = function(value, amount) {
    value += amount;
    if (value < 81) {
        return value;
    } else {
        return Math.abs(81 - value);
    }
};

/**
 * Decrement value to the amount and mod at 0. Private
 * utility used by moveXXX functions;
 * 
 * @private
 * @param {int} Initial value.
 * @param {int} Amount to decrement by.
 * @method dec
 * @return {int} Decremented value.
 */
ISOLACE.sudoku.BoardViewEvents.prototype.dec = function(value, amount) {
    value -= amount;
    if (value >= 0) {
        return value;
    } else {
        return 81 + value;
    }
};

/**
 * Gets index from event and calls selectCell.
 * 
 * @param {object} YUI event.
 * @method handleSelectEvent
 */
ISOLACE.sudoku.BoardViewEvents.prototype.handleSelectEvent = function(e) {
    var me = e.data.me;
    me.selectedCellIndex = e.data.index;
    me.selector.select(me.selectedCellIndex);
};

/**
 * Gets index from event and calls unselectCell.
 * 
 * @param {object} YUI event.
 * @method handleUnselectEvent
 */
ISOLACE.sudoku.BoardViewEvents.prototype.handleUnselectEvent = function(e) {
    var me = e.data.me;
    me.selector.unselect(e.data.index);
};

