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

if(typeof $Event == "undefined" || !$Event) {
    /**
     * A singleton instance of ISOLACE.Event automatically created as a
     * convenience vs. creating a new ISOLACE.Event for each instance.
     * @class ISOLACE.Event
     * @static
     */
    var $Event = new ISOLACE.Event();
}