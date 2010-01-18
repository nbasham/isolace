ISOLACE.namespace("sudoku");

/**
 * @class Timer
 * @namespace ISOLACE.sudoku.controller
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.TimerController = function() {
    this.time = 0;
    this.timerId = undefined;
    this.paused = false;
    $Events.handleTimerPause(this, this.pause);
    $Events.handleTimerStart(this, this.start);
    $Events.handleTimerStop(this, this.stop);
    $Events.handleTimerUnpause(this, this.unpause);
};

/**
 * Get the seconds elapsed since start minus any pause time. 
 * 
 * @method getSecondns
 */
ISOLACE.sudoku.TimerController.prototype.getSeconds = function() {
    return this.time;
};

/**
 * If the timer is paused return true, else false.
 * 
 * @method isPaused
 * @return True if the timer is paused, else false.
 * @see pause unpause
 */
ISOLACE.sudoku.TimerController.prototype.isPaused = function() {
    return this.paused === true;
};

/**
 * Increment the second count.
 * @private
 * @method increment
 */
ISOLACE.sudoku.TimerController.prototype.increment = function() {
    if(this.paused === false) {
        this.time += 1;
        $Events.fireTimerIncrement(this.time);
    }
};

/**
 * Start the timer.
 * @private
 * @method start
 */
ISOLACE.sudoku.TimerController.prototype.start = function() {
    var me = this;
    var f = function() {
        me.increment();
    };
    this.timerId = setInterval(f, 1000);
};

/**
 * Stop the timer.
 * @private
 * @method stop
 */
ISOLACE.sudoku.TimerController.prototype.stop = function() {
    clearInterval(this.timerId);
};

/**
 * Pause the timer.
 * @private
 * @method pause
 * @see unpause
 */
ISOLACE.sudoku.TimerController.prototype.pause = function() {
    this.paused = true;
};

/**
 * Unpause the timer.
 * @private
 * @method unpause
 * @see pause
 */
ISOLACE.sudoku.TimerController.prototype.unpause = function() {
    this.paused = false;
};



