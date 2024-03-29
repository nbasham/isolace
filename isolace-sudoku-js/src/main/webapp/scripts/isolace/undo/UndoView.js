/**
 * Constructs an UndoView object.
 * @class UndoView provides a GUI with undo and redo buttons, each fire undo and redo events respectively.
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.UndoView = function() {
    $('#undoButton').bind('click', function() {
        if($(this).attr('disabled') !== 'true') {
            $UndoEvent.fireUndoRequestEvent(false);
        }
    });
    $('#redoButton').bind('click', function() {
        if($(this).attr('disabled') !== 'true') {
            $UndoEvent.fireUndoRequestEvent(true);
        }
    });
    $UndoEvent.handleUpdateUndoUIEvent(this, this.updateUndoUIEvent);
};

/**
 * Update UI concerns e.g. button state.
 * @method updateUndoUIEvent
 * @private
 * @param {boolean} canUndo True if an undo is possible.
 * @param {boolean} canRedo True if a redo is possible.
 */
ISOLACE.UndoView.prototype.updateUndoUIEvent = function(canUndo, canRedo) {
    if(canUndo) {
        $('#undoButton').removeClass('ui-state-disabled').removeAttr('disabled');
    } else {
        $('#undoButton').addClass('ui-state-disabled').attr('disabled', 'true');
    }

   // $('#redoButton').removeClass('ui-state-active');
    if(canRedo) {
        $('#redoButton').removeClass('ui-state-disabled').removeAttr('disabled');
    } else {
        $('#redoButton').addClass('ui-state-disabled').attr('disabled', 'true');
    }
};
