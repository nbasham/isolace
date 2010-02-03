/**
 * Constructs an Event object.
 * @class Event provides bottlenecks for firing events and binding handlers to
 *        events.<br/>
 * <br/>Intent:
 * <ul>
 * <li>Set handler context</li>
 * <li>Pass parameters to handler vs. data in an event</li>
 * <li>Hide jQuery implementation</li>
 * <li>Provide a bottleneck</li>
 * </ul>
 * 
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.Event = function() {
};

/**
 * Event firing bottleneck.
 * @method fire
 * @param {string} eventType The Event type
 * @param {array} argArray An array of parameters to be sent with the event.
 */
ISOLACE.Event.prototype.fire = function(eventType, argArray) {
    assertDefined(eventType, 'eventType is invalid');
    var e = jQuery.Event(eventType);
    var message = "Firing event type: '" + eventType + "'";
    if(arguments.length > 1) {
        assertTrue($.isArray(argArray), "Array expected.");
        e.payload = argArray;
        message += ' with args: [' + argArray + ']';
    }

    $Log.debug(message);
    $(document).trigger(e);
};

/**
 * Event handler bottleneck.
 * @method handle
 * @param {string} eventType The Event type
 * @param {object} context The context to use when calling the handler.
 * @param {function} callback The function to call when the event is triggered.
 */
ISOLACE.Event.prototype.handle = function(eventType, context, callback) {
    assertDefined(eventType, 'eventType is invalid');
    assertDefined(context, 'context is invalid');
    assertDefined(callback, 'callback is invalid');
    var message = "Called handler for event type: '" + eventType + "'";
    $(document).bind(eventType, function(e) {
        if(e.payload !== undefined) {
            callback.apply(context, e.payload);
            message += ' with args: [' + e.payload + ']';
        } else {
            callback.call(context, e);
        }
        $Log.debug(message);
    });
};

ISOLACE.Event.prototype.isKeyCodeNumeric = function(keyCode) {
    return $Event.keyCodeToNumber(keyCode) != -1;
};

ISOLACE.Event.prototype.keyCodeToNumber = function(keyCode) {
    var number = -1;
    switch(keyCode) {
        case KeyEvent.DOM_VK_0:
            number = 0;
        break;
        case KeyEvent.DOM_VK_NUMPAD0:
            number = 0;
        break;
        case KeyEvent.DOM_VK_1:
            number = 1;
        break;
        case KeyEvent.DOM_VK_NUMPAD1:
            number = 1;
        break;
        case KeyEvent.DOM_VK_2:
            number = 2;
        break;
        case KeyEvent.DOM_VK_NUMPAD2:
            number = 2;
        break;
        case KeyEvent.DOM_VK_3:
            number = 3;
        break;
        case KeyEvent.DOM_VK_NUMPAD3:
            number = 3;
        break;
        case KeyEvent.DOM_VK_4:
            number = 4;
        break;
        case KeyEvent.DOM_VK_NUMPAD4:
            number = 4;
        break;
        case KeyEvent.DOM_VK_5:
            number = 5;
        break;
        case KeyEvent.DOM_VK_NUMPAD5:
            number = 5;
        break;
        case KeyEvent.DOM_VK_6:
            number = 6;
        break;
        case KeyEvent.DOM_VK_NUMPAD6:
            number = 6;
        break;
        case KeyEvent.DOM_VK_7:
            number = 7;
        break;
        case KeyEvent.DOM_VK_NUMPAD7:
            number = 7;
        break;
        case KeyEvent.DOM_VK_8:
            number = 8;
        break;
        case KeyEvent.DOM_VK_NUMPAD8:
            number = 8;
        break;
        case KeyEvent.DOM_VK_9:
            number = 9;
        break;
        case KeyEvent.DOM_VK_NUMPAD9:
            number = 9;
        break;

        default:
            number = -1;
        break;
    }
    
    return number;
};

if(typeof $Event == "undefined" || !$Event) {
    /**
     * A singleton instance of ISOLACE.Event automatically created as a
     * convenience vs. creating a new ISOLACE.Event for each instance.
     * @class ISOLACE.Event
     * @static
     */
    var $Event = new ISOLACE.Event();
}