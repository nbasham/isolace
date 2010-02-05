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
    $('.timerPause').toggle(function() {
        $TimerEvent.fireTimerPlayPauseRequest(true);
    },
    function() {
        $TimerEvent.fireTimerPlayPauseRequest(false);
    });
    $TimerEvent.handleTimerPlayPauseRequest(this, this.handleTimerPlayPauseRequest);
};

/**
 * Increment the second count.
 * @private
 * @method update
 */
ISOLACE.TimerView.prototype.update = function(seconds) {
    $Renderer.renderTimer(seconds);
};

ISOLACE.TimerView.prototype.handleTimerPlayPauseRequest = function(isPauseRequest) {
    var icon = $('.timerPlayPauseIcon');
//    var wasPause = icon.hasClass('ui-icon-pause');
    if(isPauseRequest) {
        icon.removeClass('ui-icon-pause');
        icon.addClass('ui-icon-play');
        $TimerEvent.fireTimerPause();
    } else {
        icon.removeClass('ui-icon-play');
        icon.addClass('ui-icon-pause');
        $TimerEvent.fireTimerUnpause();
    }
}