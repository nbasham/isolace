ISOLACE.namespace("sudoku");

/**
 * Sudoku event definitions, firers and handlers. Since JavaScript event
 * types are arbitrary strings, and the event implementations rely on jQuery
 * events the intent of this class is to encapsulate those definitions and
 * bottlenecking event implementations to help with logging and profiling.
 * 
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @class Events
 */
ISOLACE.sudoku.Events = function() {
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
            //  make an array from e.payload to pass as args to apply
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
        //e.payload = payload;
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
    $Events.fire($Events.GUESS(), {value: value, index: index});
};

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
    $Events.fire($Events.MARK(), {value: value, index: index});
};

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
    $Events.fire($Events.SHOW_BOARD(), {level: level});
};

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
    $Events.fire($Events.SOLVED(), {seconds: seconds});
};

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
    $Events.fire($Events.STATE_CHANGE(), {boardState: boardState});
};

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
    $Events.fire($Events.TIMER_INCREMENT(), {seconds: seconds});
};

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

ISOLACE.sudoku.Events.prototype.handleTimerUnpause = function(context, f) {
    $(document).bind($Events.TIMER_UNPAUSE(), function(e) {
        f.call(context);
    });
};

if (typeof $Events == "undefined" || !$Events) {
    /**
     * A singleton instance of ISOLACE.sudoku.Events automatically created as
     * a convenience vs. creating a new ISOLACE.sudoku.Events for each instance.
     * @class ISOLACE.sudoku.Events
     * @static
     */
    var $Events = new ISOLACE.sudoku.Events();
}