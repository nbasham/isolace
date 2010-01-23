ISOLACE.sudoku.UndoView = function() {
    $('#undoView').show();
    $('#undoButton').bind('click', function() {
        $Events.fireUndo(false);
    });
    $('#redoButton').bind('click', function() {
        $Events.fireUndo(true);
    });
    this.handleChange(false, false);
};

/**
 * Return the undo control (e.g. button, menu item) as a jQuery object.
 * @method getUndoControl
 * @return {jQuery element} The undo control (e.g. button, menu item) as a jQuery object.
 */
//ISOLACE.sudoku.UndoView.prototype.getUndoControl = function() {
//    return $('#undoButton');
//};

/**
 * Return the redo control (e.g. button, menu item) as a jQuery object.
 * @method getRedoControl
 * @return {jQuery element} The redo control (e.g. button, menu item) as a jQuery object.
 */
//ISOLACE.sudoku.UndoView.prototype.getRedoControl = function() {
//    return $('#redoButton');
//};

/**
 * Update UI concerns e.g. button state.
 * @method handleChange
 * @private
 * @param {boolean} canUndo True if an undo is possible.
 * @param {boolean} canRedo True if a redo is possible.
 */
ISOLACE.sudoku.UndoView.prototype.handleChange = function(canUndo, canRedo) {
    if(canUndo) {
        $('#undoButton').removeClass('ui-state-disabled').removeAttr('disabled');
    } else {
        $('#undoButton').addClass('ui-state-disabled').attr('disabled', 'true');
    }
    
    if(canRedo) {
        $('#redoButton').removeClass('ui-state-disabled').removeAttr('disabled');
    } else {
        $('#redoButton').addClass('ui-state-disabled').attr('disabled', 'true');
    }
};
