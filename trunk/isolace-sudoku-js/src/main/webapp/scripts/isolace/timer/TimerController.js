/**
 * Create a new TimerController object.
 * @class Handles the logic for a seconds timer.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.TimerController = function() {
    this.time = 0;
    this.timerId = undefined;
    this.paused = true;
    $TimerEvent.handleTimerPause(this, this.pause);
    $TimerEvent.handleTimerStart(this, this.start);
    $TimerEvent.handleTimerStop(this, this.stop);
    $TimerEvent.handleTimerUnpause(this, this.unpause);
};

/**
 * Get the seconds elapsed since start minus any pause time. 
 * 
 * @method getSeconds
 */
ISOLACE.TimerController.prototype.getSeconds = function() {
    return this.time;
};

/**
 * If the timer is paused return true, else false.
 * 
 * @method isPaused
 * @return True if the timer is paused, else false.
 * @see pause unpause
 */
//ISOLACE.TimerController.prototype.isPaused = function() {
//    return this.paused === true;
//};

/**
 * Increment the second count.
 * @private
 * @method increment
 */
ISOLACE.TimerController.prototype.increment = function() {
    if(this.paused === false) {
        this.time += 1;
        $TimerEvent.fireTimerIncrement(this.time);
    }
};

/**
 * Start the timer.
 * @private
 * @method start
 */
ISOLACE.TimerController.prototype.start = function() {
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
ISOLACE.TimerController.prototype.stop = function() {
    clearInterval(this.timerId);
};

/**
 * Pause the timer.
 * @private
 * @method pause
 * @see unpause
 */
ISOLACE.TimerController.prototype.pause = function() {
    this.paused = true;
};

/**
 * Unpause the timer.
 * @private
 * @method unpause
 * @see pause
 */
ISOLACE.TimerController.prototype.unpause = function() {
    this.paused = false;
};



