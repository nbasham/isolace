/**
 * Create a TimerView object.
 * @class Handles all HTML UI around the timer panel. Styles e.g. position and
 *        size are controlled by CSS class 'timer'. HTMLElement with id 'timer'
 *        is updated each second.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.TimerView = function() {
    $TimerEvent.handleTimerIncrement(this, this.update);
};

/**
 * Increment the second count.
 * @private
 * @method update
 */
ISOLACE.TimerView.prototype.update = function(seconds) {
    $Renderer.renderTimer(seconds);
};

/**
 * Show timer view.
 */
ISOLACE.TimerView.prototype.show = function() {
    $('#timerView').show();
};

/**
 * Hide timer view.
 */
ISOLACE.TimerView.prototype.hide = function() {
    $('#timerView').hide();
};
