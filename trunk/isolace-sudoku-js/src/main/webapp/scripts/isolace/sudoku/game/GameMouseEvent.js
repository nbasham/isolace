/**
 * Create a GameMouseEvent object.
 * @class Isolates key event handling so that it can be swapped out in non keyboard environments (e.g. iPhone).
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.GameMouseEvent = function() {
};

/**
 * @method bind
 */
ISOLACE.GameMouseEvent.prototype.bind = function(puzzle) {
    $('.cell').each(function(i, el) {
        var editable = puzzle.isEditable(i);
        if (editable) {
            $(el).bind("mouseenter", function() {
                $GameEvent.fireSelectCell(i);
            });
        }
    });
};

ISOLACE.GameMouseEvent.prototype.unbind = function() {
    $('.cell').unbind("mouseenter");
};

if(typeof $GameMouseEvent == "undefined" || !GameMouseEvent) {
    /**
     * A singleton instance of ISOLACE.GameMouseEvent automatically created as a
     * convenience vs. creating a new ISOLACE.GameMouseEvent for each instance.
     * @class ISOLACE.GameMouseEvent
     * @static
     */
    var $GameMouseEvent = new ISOLACE.GameMouseEvent();
}
