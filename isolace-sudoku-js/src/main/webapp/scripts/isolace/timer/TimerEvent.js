/**
 * Constructs an TimerEvent object.
 * @class Timer event definitions, firers and handlers.
 * 
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.TimerEvent = function() {
    
    //  UI
    this.TIMER_PLAY_PAUSE_REQUEST = function() {
        return 'ISOLACE_TIMER_PLAY_PAUSE_REQUEST';
    };
    //  LOGIC
    this.TIMER_INCREMENT = function() {
        return 'ISOLACE_TIMER_INCREMENT';
    };
    this.TIMER_PAUSE = function() {
        return 'ISOLACE_TIMER_PAUSE';
    };
    this.TIMER_START = function() {
        return 'ISOLACE_TIMER_START';
    };
    this.TIMER_STOP = function() {
        return 'ISOLACE_TIMER_STOP';
    };
    this.TIMER_UNPAUSE = function() {
        return 'ISOLACE_TIMER_UNPAUSE';
    };
};

/**
 * Unbind timer event handlers.
 * @method unbind
 */
ISOLACE.TimerEvent.prototype.unbind = function() {
    $(document).unbind(this.TIMER_PLAY_PAUSE_REQUEST());
    $(document).unbind(this.TIMER_INCREMENT());
    $(document).unbind(this.TIMER_PAUSE());
    $(document).unbind(this.TIMER_START());
    $(document).unbind(this.TIMER_STOP());
    $(document).unbind(this.TIMER_UNPAUSE());
};

/**
 * @method fireTimerPlayPauseRequest
 * @param {boolean} isPauseRequest True if the player requested pause, false if unpause.
 */
ISOLACE.TimerEvent.prototype.fireTimerPlayPauseRequest = function(isPauseRequest) {
    $Event.fire(this.TIMER_PLAY_PAUSE_REQUEST(), [isPauseRequest]);
};

/**
 * @method handleTimerPlayPauseRequest
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerPlayPauseRequest = function(context, callback) {
    $Event.handle(this.TIMER_PLAY_PAUSE_REQUEST(), context, callback);
};

/**
 * @method fireTimerIncrement
 * @param {int} seconds The number of seconds elapsed.
 */
ISOLACE.TimerEvent.prototype.fireTimerIncrement = function(seconds) {
    $Event.fire(this.TIMER_INCREMENT(), [seconds], true);
};

/**
 * @method handleTimerIncrement
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerIncrement = function(context, callback) {
    $Event.handle(this.TIMER_INCREMENT(), context, callback);
};

/**
 * @method fireTimerPause
 */
ISOLACE.TimerEvent.prototype.fireTimerPause = function() {
    $Event.fire(this.TIMER_PAUSE());
};

/**
 * @method handleTimerEvent
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerPause = function(context, callback) {
    $Event.handle(this.TIMER_PAUSE(), context, callback);
};

/**
 * @method fireTimerStart
 */
ISOLACE.TimerEvent.prototype.fireTimerStart = function() {
    $Event.fire(this.TIMER_START());
};

/**
 * @method handleTimerStart
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerStart = function(context, callback) {
    $Event.handle(this.TIMER_START(), context, callback);
};

/**
 * @method fireTimerStop
 */
ISOLACE.TimerEvent.prototype.fireTimerStop = function() {
    $Event.fire(this.TIMER_STOP());
};

/**
 * @method handleTimerStop
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerStop = function(context, callback) {
    $Event.handle(this.TIMER_STOP(), context, callback);
};

/**
 * @method fireTimerUnpause
 */
ISOLACE.TimerEvent.prototype.fireTimerUnpause = function() {
    $Event.fire(this.TIMER_UNPAUSE());
};

/**
 * @method handleTimerUnpause
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerUnpause = function(context, callback) {
    $Event.handle(this.TIMER_UNPAUSE(), context, callback);
};

/**
 * @method handleTimerStop
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.TimerEvent.prototype.handleTimerStop = function(context, callback) {
    $Event.handle(this.TIMER_STOP(), context, callback);
};

if(typeof $TimerEvent == "undefined" || !$TimerEvent) {
    /**
     * A singleton instance of ISOLACE.TimerEvent automatically created as a
     * convenience vs. creating a new ISOLACE.TimerEvent for each instance.
     * @class ISOLACE.TimerEvent
     * @static
     */
    var $TimerEvent = new ISOLACE.TimerEvent();
}