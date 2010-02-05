/**
 * Constructs an GameEvent object.
 * @class Game event definitions, firers and handlers.
 * 
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.GameEvent = function() {
    
    this.STATE_CHANGE = function() {
        return 'ISOLACE_EVENT_STATE_CHANGE';
    };
    // UI Events Follow
    this.MARK_MODE = function() {
        return 'ISOLACE_EVENT_MARK_MODE';
    };
    this.GUESS = function() {
        return 'ISOLACE_EVENT_GUESS';
    };
    this.LEVEL_CHANGE = function() {
        return 'ISOLACE_EVENT_LEVEL_CHANGE';
    };
    this.SELECT_CELL = function() {
        return 'ISOLACE_EVENT_SELECT_CELL';
    };
    this.SELECT_CELL_UP = function() {
        return 'ISOLACE_EVENT_SELECT_CELL_UP';
    };
    this.SELECT_CELL_DOWN = function() {
        return 'ISOLACE_EVENT_SELECT_CELLL_DOWN';
    };
    this.SELECT_CELL_LEFT = function() {
        return 'ISOLACE_EVENT_SELECT_CELL_LEFT';
    };
    this.SELECT_CELL_RIGHT = function() {
        return 'ISOLACE_EVENT_SELECT_CELL_RIGHT';
    };
};

/**
 * Unbind game event handlers.
 * @method unbind
 */
ISOLACE.GameEvent.prototype.unbind = function() {
    $(document).unbind(this.MARK_MODE());
    $(document).unbind(this.GUESS());
    $(document).unbind(this.STATE_CHANGE());
    $(document).unbind(this.LEVEL_CHANGE());
    $(document).unbind(this.SELECT_CELL());
    $(document).unbind(this.SELECT_CELL_UP());
    $(document).unbind(this.SELECT_CELL_DOWN());
    $(document).unbind(this.SELECT_CELL_LEFT());
    $(document).unbind(this.SELECT_CELL_RIGHT());
};

/**
 * Fire GUESS event.
 * @method fireGuess
 * @param {int} value The value of the guess.
 */
ISOLACE.GameEvent.prototype.fireGuess = function(value) {
    $Event.fire(this.GUESS(), [value]);
};

/**
 * Bind a handler to the GUESS event.
 * @method handleGuess
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.GameEvent.prototype.handleGuess = function(context, callback) {
    $Event.handle(this.GUESS(), context, callback);
};

/**
 * Fire fireMarkMode event.
 * @method fireMarkMode
 */
ISOLACE.GameEvent.prototype.fireToggleMarkMode = function() {
    $Event.fire(this.MARK_MODE());
};

/**
 * Bind a handler to the MARK_MODE event.
 * @method handleToggleMarkMode
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.GameEvent.prototype.handleToggleMarkMode = function(context, callback) {
    $Event.handle(this.MARK_MODE(), context, callback);
};

/**
 * Fire STATE_CHANGE event.
 * @method fireStateChange
 * @param {BoardState} boardState The current state of the board.
 */
ISOLACE.GameEvent.prototype.fireStateChange = function(boardState) {
    $Event.fire(this.STATE_CHANGE(), [boardState]);
};

/**
 * Bind a handler to the STATE_CHANGE event. The handler expects one argument (BorderState).
 * @method handleStateChange
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.GameEvent.prototype.handleStateChange = function(context, callback) {
    $Event.handle(this.STATE_CHANGE(), context, callback);
};

/**
 * Fire LEVEL_CHANGE event.
 * @method fireLevelChange
 * @param {int} puzzleLevel The puzzle level.
 */
ISOLACE.GameEvent.prototype.fireLevelChange = function(puzzleLevel) {
    $Event.fire(this.LEVEL_CHANGE(), [puzzleLevel]);
};

/**
 * Bind a handler to the LEVEL_CHANGE event. The handler expects one argument (puzzleLevel).
 * @method handleLevelChange
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.GameEvent.prototype.handleLevelChange = function(context, callback) {
    $Event.handle(this.LEVEL_CHANGE(), context, callback);
};

ISOLACE.GameEvent.prototype.fireSelectCell = function(index) { $Event.fire(this.SELECT_CELL(), [index]);};
ISOLACE.GameEvent.prototype.handleSelectCell = function(context, callback) {$Event.handle(this.SELECT_CELL(), context, callback);};
ISOLACE.GameEvent.prototype.fireSelectCellUp = function() { $Event.fire(this.SELECT_CELL_UP());};
ISOLACE.GameEvent.prototype.handleSelectCellUp = function(context, callback) {$Event.handle(this.SELECT_CELL_UP(), context, callback);};
ISOLACE.GameEvent.prototype.fireSelectCellDown = function() { $Event.fire(this.SELECT_CELL_DOWN());};
ISOLACE.GameEvent.prototype.handleSelectCellDown = function(context, callback) {$Event.handle(this.SELECT_CELL_DOWN(), context, callback);};
ISOLACE.GameEvent.prototype.fireSelectCellLeft = function() { $Event.fire(this.SELECT_CELL_LEFT());};
ISOLACE.GameEvent.prototype.handleSelectCellLeft = function(context, callback) {$Event.handle(this.SELECT_CELL_LEFT(), context, callback);};
ISOLACE.GameEvent.prototype.fireSelectCellRight = function() { $Event.fire(this.SELECT_CELL_RIGHT());};
ISOLACE.GameEvent.prototype.handleSelectCellRight = function(context, callback) {$Event.handle(this.SELECT_CELL_RIGHT(), context, callback);};

if(typeof $GameEvent == "undefined" || !$GameEvent) {
    /**
     * A singleton instance of ISOLACE.GameEvent automatically created as a
     * convenience vs. creating a new ISOLACE.GameEvent for each instance.
     * @class ISOLACE.GameEvent
     * @static
     */
    var $GameEvent = new ISOLACE.GameEvent();
}