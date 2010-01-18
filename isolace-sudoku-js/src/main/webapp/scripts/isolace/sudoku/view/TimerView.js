ISOLACE.namespace("sudoku");

/**
 * Handles all HTML UI around the timer panel. Styles e.g.
 * position and size are controlled by CSS class 'timer'.
 * HTMLElement with id 'timer' is updated each second.
 * 
 * @class TimerView
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.TimerView = function() {
    $Events.handleTimerIncrement(this, this.update);
    $('#timerView').html('00:00');
    var me = this;
    $Events.handleSolved(this, this.stop);
};

/**
 * Get the timer panel HTML.
 * @method getHtml
 * @return The HTML representing the timer panel.
 */
ISOLACE.sudoku.TimerView.prototype.getHtml = function() {
    return this.htm;
};

/**
 * Start the timer.
 * @method start
 */
//ISOLACE.sudoku.TimerView.prototype.start = function() {
//    $Events.fireTimerStart();
//};

/**
 * Stop the timer.
 * @method stop
 */
//ISOLACE.sudoku.TimerView.prototype.stop = function() {
//    $Events.fireTimerStop();
//};

/**
 * Pause the timer.
 * @method pause
 */
ISOLACE.sudoku.TimerView.prototype.pause = function() {
    return this.timer.pause();
};

/**
 * Unpause the timer.
 * @method unpause
 */
ISOLACE.sudoku.TimerView.prototype.unpause = function() {
    return this.timer.unpause();
};

/**
 * Increment the second count.
 * @private
 * @method update
 */
ISOLACE.sudoku.TimerView.prototype.update = function(seconds) {
    var time = this.format(seconds);
    $('#timerView').html(time);
};

/**
 * Format the seconds to mmm:ss.
 * @private
 * @method format
 */
ISOLACE.sudoku.TimerView.prototype.format = function(seconds) {
    var timeStr = '';
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    if(min < 10) {
        timeStr = '0' + min;
    } else {
        timeStr = '' + min;
    }
    timeStr += ':';
    if(sec < 10) {
        timeStr += '0' + sec;
    } else {
        timeStr += '' + sec;
    }
    
    return timeStr;
};
