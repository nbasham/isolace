ISOLACE.undoManager = function() {
    this.stack = [];
    this.stackPtr = 0;
    log('undoManager instantiated, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr);
};

ISOLACE.undoManager.prototype.add = function(o) {
    this.stack.push(o);
    this.stackPtr = this.stack.length;
    log('undoManager add, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr);
}

ISOLACE.undoManager.prototype.undo = function(o) {
    if(!$undo.canUndo()){
        return null;
    }
    this.stackPtr--;
    var o = this.stack[this.stackPtr];
    log('undoManager undo, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr);
    return o;
}

ISOLACE.undoManager.prototype.redo = function(o) {
    if(!$undo.canRedo()){
        return null;
    }
    var o = this.stack[this.stackPtr];
    this.stackPtr++;
    log('undoManager redo, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr);
    return o;
}

ISOLACE.undoManager.prototype.canUndo = function(o) {
    log('undoManager canUndo ' + (this.stackPtr > 0));
    return this.stackPtr > 0;
}

ISOLACE.undoManager.prototype.canRedo = function(o) {
    log('undoManager canRedo ' + (this.stackPtr < this.stack.length));
    return this.stackPtr < this.stack.length;
}

if (typeof $undo == "undefined" || !$undo) {
       /**
        * A singleton instance of ISOLACE.undoManager automatically
        * created as a convenience so $undo can be used instead of
        * ISOLACE.undoManager.
        * @class ISOLACE.undoManager
        * @static
        */
       var $undo = new ISOLACE.undoManager();
}
