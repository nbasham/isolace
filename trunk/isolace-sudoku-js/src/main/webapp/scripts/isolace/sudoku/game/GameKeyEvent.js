/**
 * Create a GameKeyEvent object.
 * @class Isolates key event handling so that it can be swapped out in non keyboard environments (e.g. iPhone).
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.GameKeyEvent = function() {
};

/**
 * @method bind
 */
ISOLACE.GameKeyEvent.prototype.bind = function(puzzle) {
    $('body').keyup(function(event) {
        var keyCode = event.keyCode;
        if(keyCode == KeyEvent.DOM_VK_M) {
            $GameEvent.fireToggleMarkMode();
        } else if(keyCode == KeyEvent.DOM_VK_UP) {
            $GameEvent.fireSelectCellUp();
        } else if(keyCode == KeyEvent.DOM_VK_DOWN) {
            $GameEvent.fireSelectCellDown();
        } else if(keyCode == KeyEvent.DOM_VK_LEFT) {
            $GameEvent.fireSelectCellLeft();
        } else if(keyCode == KeyEvent.DOM_VK_RIGHT) {
            $GameEvent.fireSelectCellRight();
        } else if(keyCode == KeyEvent.DOM_VK_BACK_SPACE) {
            event.preventDefault();
        } else if($Event.isKeyCodeNumeric(keyCode)) {
            var number = $Event.keyCodeToNumber(keyCode);
            if(number != 0) {
                $GameEvent.fireGuess(number);
            }
        }
    });
};

ISOLACE.GameKeyEvent.prototype.unbind = function() {
    $('body').unbind('keyup');
};

if(typeof $GameKeyEvent == "undefined" || !$GameKeyEvent) {
    /**
     * A singleton instance of ISOLACE.GameKeyEvent automatically created as a
     * convenience vs. creating a new ISOLACE.GameKeyEvent for each instance.
     * @class ISOLACE.GameKeyEvent
     * @static
     */
    var $GameKeyEvent = new ISOLACE.GameKeyEvent();
}