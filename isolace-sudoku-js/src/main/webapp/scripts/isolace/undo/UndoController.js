/**
 * Constructs an UndoController object.
 * @class UndoController maintains an undo stack and manages the interaction
 *        between the UI and the consumer (the application requiring undo/redo).
 * 
 * <pre>
 * Events fired: UNDO, UPDATE_UNDO_UI
 * Events consumed: SUBMIT_UNDO_RECORD, UNDO_REQUEST
 * </pre>
 * 
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 * @param {object} o The initial state to enter in undo queue.
 */
ISOLACE.UndoController = function(o) {
    assertDefined(o);
    this.stack = [];
    this.stack.push(o);
    this.stackPtr = 0;
    $Log.debug('UndoController instantiated: ' + this.toString());
    $UndoEvent.handleSubmitUndoRecordEvent(this, this.add);
    $UndoEvent.handleUndoRequestEvent(this, function(isRedo) {
        var o;
        if(isRedo) {
            o = this.redo();
        } else {
            o = this.undo();
        }
        assertDefined(o);
        $UndoEvent.fireUndoEvent(o);
        $UndoEvent.fireUpdateUndoUIEvent(this.canUndo(), this.canRedo());
    });
    // initial update for UI
    $UndoEvent.fireUpdateUndoUIEvent(this.canUndo(), this.canRedo());
};

/**
 * Add a value to the undo stack.
 * @method add
 * @private
 */
ISOLACE.UndoController.prototype.add = function(o) {
    // add resets length of stack
    this.stack.length = this.stackPtr + 1;

    this.stack.push(this.clone(o));

    this.stackPtr = this.stack.length - 1;
    $Log.debug('UndoController add: ' + this.toString());
    $UndoEvent.fireUpdateUndoUIEvent(this.canUndo(), this.canRedo());
};

/**
 * Make a copy of values passed by reference.
 * @method clone
 * @private
 */
ISOLACE.UndoController.prototype.clone = function(o) {
    if($.isArray(o)) {
        /*
         * Arrays are passed by ref and do not have a clone function so we use
         * splice or concat with no arguments to copy the array.
         */
        var newArray = o.concat();
        return newArray;
    } else if($.isPlainObject(o)) {
        return o.clone();
    } else {
        return o;
    }
};

/**
 * Get the previous item on the undo stack.
 * @method undo
 * @private
 */
ISOLACE.UndoController.prototype.undo = function() {
    if(!this.canUndo()) {
        return null;
    }
    this.stackPtr--;
    var boardState = this.stack[this.stackPtr];
    $Log.debug('UndoController undo: ' + this.toString());
    return boardState;
};

/**
 * Get the next item on the undo stack.
 * @method redo
 * @private
 */
ISOLACE.UndoController.prototype.redo = function() {
    if(!this.canRedo()) {
        return null;
    }
    this.stackPtr++;
    var boardState = this.stack[this.stackPtr];
    $Log.debug('UndoController redo: ' + this.toString());
    return boardState;
};

/**
 * Determine if it is possible to do an undo.
 * @method canUndo
 * @private
 */
ISOLACE.UndoController.prototype.canUndo = function() {
    return this.stackPtr > 0;
};

/**
 * Determine if it is possible to do a redo.
 * @method canRedo
 * @private
 */
ISOLACE.UndoController.prototype.canRedo = function() {
    return this.stackPtr < (this.stack.length - 1);
};

/**
 * Return UndoController state for this instance e.g. "stack size 3 stackptr 2
 * canUndo true canRedo false".
 * @method toString
 */
ISOLACE.UndoController.prototype.toString = function() {
    var message = 'stack size ' + this.stack.length;
    message += ' stackptr ' + this.stackPtr;
    message += ' canUndo ' + this.canUndo();
    message += ' canRedo ' + this.canRedo();
    return message;
};
