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
    $('#timerView')
            .html(
                    "<img src='../images/45/numbers/timer-0.png' /><img src='../images/45/numbers/timer-0.png' /><img src='../images/45/numbers/timer-seperator.png' /><img src='../images/45/numbers/timer-0.png' /><img src='../images/45/numbers/timer-0.png' />");
};

/**
 * Increment the second count.
 * @private
 * @method update
 */
ISOLACE.TimerView.prototype.update = function(seconds) {
    $('#timerView').html('');
    var time = $SUDOKU_UTIL.formatTime(seconds);
    var timeElements = time.split('');
    for( var i = 0; i < timeElements.length; i++) {
        var el = timeElements[i];
        if(el == ':') {
            el = 'seperator';
        }
        var src = '../images/45/numbers/timer-' + el + '.png';
        $('#timerView').append("<img src='" + src + "' />");
    }
};
