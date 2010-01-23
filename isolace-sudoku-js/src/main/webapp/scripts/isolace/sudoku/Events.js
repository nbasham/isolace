ISOLACE.namespace("sudoku");

/**
 * Event definitions, firers and handlers. The intent of this class is to:
 * <ul>
 * <li>Hide jQuery implementation</li>
 * <li>Encapsulate arbitrary JavaScript event types</li>
 * <li>Provide a bottleneck</li>
 * </ul>
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @class Events
 */
ISOLACE.sudoku.Events = function() {
    // encapsulate private static event types
    this.MARK = function() {
        return 'ISOLACE.sudoku.EVENT_MARK';
    };
    this.GUESS = function() {
        return 'ISOLACE.sudoku.EVENT_GUESS';
    };
    this.SHOW_BOARD = function() {
        return 'ISOLACE.sudoku.EVENT_BOARD_SHOW';
    };
    this.SHOW_MAIN_MENU = function() {
        return 'ISOLACE.sudoku.EVENT_MAIN_MENU_SHOW';
    };
    this.SOLVED = function() {
        return 'ISOLACE.sudoku.EVENT_SOLVED';
    };
    this.STATE_CHANGE = function() {
        return 'ISOLACE.sudoku.EVENT_STATE_CHANGE';
    };
    this.TIMER_INCREMENT = function() {
        return 'ISOLACE.sudoku.EVENT_TIMER_INCREMENT';
    };
    this.TIMER_PAUSE = function() {
        return 'ISOLACE.sudoku.EVENT_TIMER_PAUSE';
    };
    this.TIMER_START = function() {
        return 'ISOLACE.sudoku.EVENT_TIMER_START';
    };
    this.TIMER_STOP = function() {
        return 'ISOLACE.sudoku.EVENT_TIMER_STOP';
    };
    this.TIMER_UNPAUSE = function() {
        return 'ISOLACE.sudoku.EVENT_TIMER_UNPAUSE';
    };
    this.UNDO = function() {
        return 'ISOLACE.sudoku.EVENT_UNDO';
    };
    this.UNDO_UI = function() {
        return 'ISOLACE.sudoku.EVENT_UNDO_UI';
    };
};

/**
 * Event handler bottleneck.
 * @method handle
 * @private
 * @param {string} eventType The Event type
 * @param {object} eventType The Event type
 */
ISOLACE.sudoku.Events.prototype.handle = function(eventType, context, callback) {
    $(document).bind(eventType, function(e) {
        var args = [];
        if(e.payload !== undefined) {
            // make an array from e.payload to pass as arg array to apply
            // PROBLEM: e.payload is obj and don't know how to order arg array
        }
        callback.apply(context, args);
    });
};

/**
 * Event firing bottleneck.
 * @method fire
 * @private
 * @param {string} eventType The Event type
 * @param {object} eventType The Event type
 */
ISOLACE.sudoku.Events.prototype.fire = function(type, payload) {
    var e = jQuery.Event(type);
    if(payload !== undefined) {
        $.extend(e, payload);
        // e.payload = payload;
    }

    $(document).trigger(e);
};

/**
 * Fire GUESS event.
 * @method fireGuess
 * @param {int} value The value of the guess.
 * @param {int} index The cell index of the guess.
 */
ISOLACE.sudoku.Events.prototype.fireGuess = function(value, index) {
    $Events.fire($Events.GUESS(), {
        value : value,
        index : index
    });
};

/**
 * Bind a handler to the GUESS event. The handler expects two arguments (value, index).
 * @method handleGuess
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleGuess = function(context, f) {
    $(document).bind($Events.GUESS(), function(e) {
        f.call(context, e.value, e.index);
    });
};

/**
 * Fire MARK event.
 * @method fireMark
 * @param {int} value The value of the mark.
 * @param {int} index The cell index of the mark.
 */
ISOLACE.sudoku.Events.prototype.fireMark = function(value, index) {
    $Events.fire($Events.MARK(), {
        value : value,
        index : index
    });
};

/**
 * Bind a handler to the MARK event. The handler expects two arguments (value, index).
 * @method handleMark
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleMark = function(context, f) {
    $(document).bind($Events.MARK(), function(e) {
        f.call(context, e.value, e.index);
    });
};

/**
 * Fire SHOW_BOARD event.
 * @method fireShowBoard
 * @param {int} level The puzzle level to use (i.e EASY, MEDIUM or HARD).
 */
ISOLACE.sudoku.Events.prototype.fireShowBoard = function(level) {
    $Events.fire($Events.SHOW_BOARD(), {
        level : level
    });
};

/**
 * Bind a handler to the SHOW_BOARD event. The handler expects one argument (level).
 * @method handleShowBoard
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleShowBoard = function(context, f) {
    $(document).bind($Events.SHOW_BOARD(), function(e) {
        f.call(context, e.level);
    });
};

/**
 * Fire SHOW_MAIN_MENU event.
 * @method fireShowMainMenu
 */
ISOLACE.sudoku.Events.prototype.fireShowMainMenu = function() {
    $Events.fire($Events.SHOW_MAIN_MENU());
};

/**
 * Bind a handler to the SHOW_MAIN_MENU event.
 * @method handleShowMainMenu
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleShowMainMenu = function(context, f) {
    $(document).bind($Events.SHOW_MAIN_MENU(), function(e) {
        f.call(context);
    });
};

/**
 * Fire SOLVED event.
 * @method fireSolved
 * @param {int} seconds The number of seconds it took to solve the puzzle.
 */
ISOLACE.sudoku.Events.prototype.fireSolved = function(seconds) {
    $Events.fire($Events.SOLVED(), {
        seconds : seconds
    });
};

/**
 * Bind a handler to the SOLVED event. The handler expects one argument (seconds).
 * @method handleSolved
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleSolved = function(context, f) {
    $(document).bind($Events.SOLVED(), function(e) {
        f.call(context, e.seconds);
    });
};

/**
 * Fire STATE_CHANGE event.
 * @method fireStateChange
 * @param {BoardState} boardState The current state of the board.
 */
ISOLACE.sudoku.Events.prototype.fireStateChange = function(boardState) {
    $Events.fire($Events.STATE_CHANGE(), {
        boardState : boardState
    });
};

/**
 * Bind a handler to the STATE_CHANGE event. The handler expects one argument (BorderState).
 * @method handleStateChange
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleStateChange = function(context, f) {
    $(document).bind($Events.STATE_CHANGE(), function(e) {
        f.call(context, e.boardState);
    });
};

/**
 * Fire TIMER_INCREMENT event every second.
 * @method fireTimerIncrement
 * @param {int} seconds The number of seconds the game has been played.
 */
ISOLACE.sudoku.Events.prototype.fireTimerIncrement = function(seconds) {
    $Events.fire($Events.TIMER_INCREMENT(), {
        seconds : seconds
    });
};

/**
 * Bind a handler to the TIMER_INCREMENT event. The handler expects one argument (seconds).
 * @method handleTimerIncrement
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleTimerIncrement = function(context, f) {
    $(document).bind($Events.TIMER_INCREMENT(), function(e) {
        f.call(context, e.seconds);
    });
};

/**
 * Fire TIMER_PAUSE event.
 * @method fireTimerPause
 */
ISOLACE.sudoku.Events.prototype.fireTimerPause = function() {
    $Events.fire($Events.TIMER_PAUSE());
};

/**
 * Bind a handler to the TIMER_PAUSE event.
 * @method handleTimerPause
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleTimerPause = function(context, f) {
    $(document).bind($Events.TIMER_PAUSE(), function(e) {
        f.call(context);
    });
};

/**
 * Fire TIMER_START event.
 * @method fireTimerStart
 */
ISOLACE.sudoku.Events.prototype.fireTimerStart = function() {
    $Events.fire($Events.TIMER_START());
};

/**
 * Bind a handler to the TIMER_START event.
 * @method handleTimerStart
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleTimerStart = function(context, f) {
    $(document).bind($Events.TIMER_START(), function(e) {
        f.call(context);
    });
};

/**
 * Fire TIMER_STOP event.
 * @method fireTimerStop
 */
ISOLACE.sudoku.Events.prototype.fireTimerStop = function() {
    $Events.fire($Events.TIMER_STOP());
};

/**
 * Bind a handler to the TIMER_STOP event.
 * @method handleTimerStop
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleTimerStop = function(context, f) {
    $(document).bind($Events.TIMER_STOP(), function(e) {
        f.call(context);
    });
};

/**
 * Fire TIMER_UNPAUSE event.
 * @method fireTimerUnpause
 */
ISOLACE.sudoku.Events.prototype.fireTimerUnpause = function() {
    $Events.fire($Events.TIMER_UNPAUSE());
};

/**
 * Bind a handler to the TIMER_UNPAUSE event.
 * @method handleTimerUnpause
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleTimerUnpause = function(context, f) {
    $(document).bind($Events.TIMER_UNPAUSE(), function(e) {
        f.call(context);
    });
};

/**
 * Fire UNDO event.
 * @method fireUndo
 * @param {boolean} isRedo Flag to determine if this is a redo (vs. undo) event.
 */
ISOLACE.sudoku.Events.prototype.fireUndo = function(isRedo) {
    $Events.fire($Events.UNDO(), {
        isRedo : isRedo
    });
};

/**
 * Bind a handler to the UNDO event. The handler expects one argument (isRedo).
 * @method handleUndo
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleUndo = function(context, f) {
    $(document).bind($Events.UNDO(), function(e) {
        f.call(context, e.isRedo);
    });
};

/**
 * Fire UNDO_UI event.
 * @method fireUndoUI
 * @param {boolean} canUndo Is an undo possible.
 * @param {boolean} canRedo Is an redo possible.
 */
ISOLACE.sudoku.Events.prototype.fireUndoUI = function(canUndo, canRedo) {
    $Events.fire($Events.UNDO_UI(), {
        canUndo : canUndo,
        canRedo : canRedo
    });
};

/**
 * Bind a handler to the UNDO_UI event. The handler expects two arguments (canUndo, canRedo).
 * @method handleUndoUI
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} f The function you wish to invoke when the event is fired.
 */
ISOLACE.sudoku.Events.prototype.handleUndoUI = function(context, f) {
    $(document).bind($Events.UNDO_UI(), function(e) {
        f.call(context, e.canUndo, e.canRedo);
    });
};

if(typeof $Events == "undefined" || !$Events) {
    /**
     * A singleton instance of ISOLACE.sudoku.Events automatically created as a
     * convenience vs. creating a new ISOLACE.sudoku.Events for each instance.
     * @class ISOLACE.sudoku.Events
     * @static
     */
    var $Events = new ISOLACE.sudoku.Events();
}