/**
 * Constructs an UndoEvent object.
 * @class UndoEvent Undo event definitions, firers and handlers. Use cases:
 *        Application data is modified and application logic fires a
 *        submitUndoRecord event. The undo controller updates its stack and
 *        fires an updateUndoUi event (e.g. menu item may be enabled). At some
 *        point in time the user may trigger an undoRequest. The undo controller
 *        listens for this and subsequently fires an undo event. The application
 *        listens for the undo event and updates its state to the data contained
 *        in the event.
 * 
 * <pre>
 * Events defined:
 * 
 * SUBMIT_UNDO_RECORD
 *     The application fires this event when it wants to add a new entry to the
 *     undo queue.
 *     
 *     source: application
 *     consumer: undo controller
 *     
 * UNDO
 *     The undo controller fires this event to the application based on a user
 *     request for undo/redo. The event contains the data to be applied to the
 *     application. The undo controller automatically makes a copy of data passed
 *     by reference.
 *     
 *     source: undo controller
 *     consumer: application
 *     
 * UNDO_REQUEST
 *     The undo UI fires this when a user requests an undo or redo.
 *     
 *     source: undo view
 *     consumer: undo controller
 * 
 * UPDATE_UNDO_UI
 *     The undo controller fires this to the undo UI when a change occurs, so the UI
 *     can update its state (e.g. enable/disable a menu item).
 *     
 *     source:  undo controller
 *     consumer: undo view
 * </pre>
 * 
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.UndoEvent = function() {
    // encapsulate private static event types

    this.SUBMIT_UNDO_RECORD = function() {
        return 'ISOLACE.SUBMIT_UNDO_RECORD';
    };

    this.UNDO = function() {
        return 'ISOLACE.UNDO';
    };

    this.UNDO_REQUEST = function() {
        return 'ISOLACE.UNDO_REQUEST';
    };

    this.UPDATE_UNDO_UI = function() {
        return 'ISOLACE.UPDATE_UNDO_UI';
    };
};

/**
 * Unbind undo event handlers.
 * @method unbind
 */
ISOLACE.UndoEvent.prototype.unbind = function() {
    $(document).unbind(this.SUBMIT_UNDO_RECORD());
    $(document).unbind(this.UNDO());
    $(document).unbind(this.UNDO_REQUEST());
    $(document).unbind(this.UPDATE_UNDO_UI());
};

/**
 * An application should fire this event with the data it wants added to the undo
 * queue.
 * @method fireSubmitUndoRecordEvent
 * @param {object} data The data to add to the undo queue.
 */
ISOLACE.UndoEvent.prototype.fireSubmitUndoRecordEvent = function(data) {
    $Event.fire(this.SUBMIT_UNDO_RECORD(), [data]);
};

/**
 * Internal. Used by the undo controller to listen for application data.
 * @method handleSubmitUndoRecordEvent
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.UndoEvent.prototype.handleSubmitUndoRecordEvent = function(context, callback) {
    $Event.handle(this.SUBMIT_UNDO_RECORD(), context, callback);
};

/**
 * Internal. Fired by the undo controller to update the application with undo/redo
 * data.
 * @method fireUndoEvent
 * @param {object} data The data to update application with.
 */
ISOLACE.UndoEvent.prototype.fireUndoEvent = function(data) {
    $Event.fire(this.UNDO(), [data]);
};

/**
 * An application should listen for this event to get the undo/redo data.
 * @method handleUndoEvent
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.UndoEvent.prototype.handleUndoEvent = function(context, callback) {
    $Event.handle(this.UNDO(), context, callback);
};

/**
 * The UI should fire this event if a user has initiated an undo or redo.
 * @method fireUndoRequestEvent
 * @param {boolean} isRedo True if the user request a redo, false if undo.
 */
ISOLACE.UndoEvent.prototype.fireUndoRequestEvent = function(isRedo) {
    $Event.fire(this.UNDO_REQUEST(), [isRedo]);
};

/**
 * Internal. The undo controller listens to the UI for this event.
 * @method handleUndoRequestEvent
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.UndoEvent.prototype.handleUndoRequestEvent = function(context, callback) {
    $Event.handle(this.UNDO_REQUEST(), context, callback);
};

/**
 * Internal. The undo controller fires this event when undo related UI changes
 * should be made (e.g. en/disable a undo button or menu item).
 * @method fireUpdateUndoUIEvent
 * @param {boolean} canUndo True if UI should enable undo, false if it should
 *            disable.
 * @param {boolean} canRedo True if UI should enable redo, false if it should
 *            disable.
 */
ISOLACE.UndoEvent.prototype.fireUpdateUndoUIEvent = function(canUndo, canRedo) {
    $Event.fire(this.UPDATE_UNDO_UI(), [canUndo, canRedo]);
};

/**
 * An application should handle this event if part of it's UI needs to enable/
 * disable an undo/redo control. This is not necessary if the application is using
 * @method handleUpdateUndoUIEvent
 * @param {object} context The context to set when calling the handler (usually this).
 * @param {function} callback The function to invoke when the event is fired.
 */
ISOLACE.UndoEvent.prototype.handleUpdateUndoUIEvent = function(context, callback) {
    $Event.handle(this.UPDATE_UNDO_UI(), context, callback);
};

if(typeof $UndoEvent == "undefined" || !$UndoEvent) {
    /**
     * A singleton instance of ISOLACE.UndoEvent automatically created as a
     * convenience vs. creating a new ISOLACE.UndoEvent for each instance.
     * @class ISOLACE.UndoEvent
     * @static
     */
    var $UndoEvent = new ISOLACE.UndoEvent();
}