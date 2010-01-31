/**
 * Constructs an GameEvent object.
 * @class Game event definitions, firers and handlers.
 * 
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.GameEvent = function() {
    
    // encapsulate private static event types
    this.MARK = function() {
        return 'ISOLACE.EVENT_MARK';
    };
    this.MARK_MODE = function() {
        return 'ISOLACE.EVENT_MARK_MODE';
    };
    this.GUESS = function() {
        return 'ISOLACE.EVENT_GUESS';
    };
    this.STATE_CHANGE = function() {
        return 'ISOLACE.EVENT_STATE_CHANGE';
    };
};

/**
 * Unbind game event handlers.
 * @method unbind
 */
ISOLACE.GameEvent.prototype.unbind = function() {
    $(document).unbind(this.MARK());
    $(document).unbind(this.MARK_MODE());
    $(document).unbind(this.GUESS());
    $(document).unbind(this.STATE_CHANGE());
};

/**
 * Fire GUESS event.
 * @method fireGuess
 * @param {int} value The value of the guess.
 * @param {int} index The cell index of the guess.
 */
ISOLACE.GameEvent.prototype.fireGuess = function(value, index) {
    $Event.fire(this.GUESS(), [value, index]);
};

/**
 * Bind a handler to the GUESS event. The handler expects two arguments (value, index).
 * @method handleGuess
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.GameEvent.prototype.handleGuess = function(context, callback) {
    $Event.handle(this.GUESS(), context, callback);
};

/**
 * Fire MARK event.
 * @method fireMark
 * @param {int} value The value of the mark.
 * @param {int} index The cell index of the mark.
 */
ISOLACE.GameEvent.prototype.fireMark = function(value, index) {
    $Event.fire(this.MARK(), [value, index]);
};

/**
 * Bind a handler to the MARK event. The handler expects two arguments (value, index).
 * @method handleMark
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.GameEvent.prototype.handleMark = function(context, callback) {
    $Event.handle(this.MARK(), context, callback);
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

if(typeof $GameEvent == "undefined" || !$GameEvent) {
    /**
     * A singleton instance of ISOLACE.GameEvent automatically created as a
     * convenience vs. creating a new ISOLACE.GameEvent for each instance.
     * @class ISOLACE.GameEvent
     * @static
     */
    var $GameEvent = new ISOLACE.GameEvent();
}