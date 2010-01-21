ISOLACE.namespace("sudoku");

ISOLACE.sudoku.UndoController = function(o) {
    assertDefined(o);
    this.stack = [];
    this.stack.push(o);
    this.stackPtr = 0;
    $Log.debug('UndoController instantiated, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr + ' canUndo ' + this.canUndo() + ' canRedo ' + this.canRedo());
};

ISOLACE.sudoku.UndoController.prototype.add = function(o) {
    //  add resets length of stack
    this.stack.length = this.stackPtr + 1;

    this.stack.push(o);
    
    this.stackPtr = this.stack.length - 1;
    $Log.debug('UndoController add, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr + ' canUndo ' + this.canUndo() + ' canRedo ' + this.canRedo());
    $Events.fireUndoUI(this.canUndo(), this.canRedo());
}

ISOLACE.sudoku.UndoController.prototype.undo = function() {
    if(!this.canUndo()){
        return null;
    }
    this.stackPtr--;
    var boardState = this.stack[this.stackPtr];
    $Log.debug('UndoController undo, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr + ' canUndo ' + this.canUndo() + ' canRedo ' + this.canRedo());
    return boardState;
}

ISOLACE.sudoku.UndoController.prototype.redo = function() {
    if(!this.canRedo()){
        return null;
    }
    this.stackPtr++;
    var boardState = this.stack[this.stackPtr];
    $Log.debug('UndoController redo, stack size is ' + this.stack.length + ' stackptr is ' + this.stackPtr + ' canUndo ' + this.canUndo() + ' canRedo ' + this.canRedo());
    $Events.fireUndoUI(this.canUndo(), this.canRedo());
    return boardState;
}

ISOLACE.sudoku.UndoController.prototype.canUndo = function() {
    return this.stackPtr > 0;
}

ISOLACE.sudoku.UndoController.prototype.canRedo = function() {
    return this.stackPtr < (this.stack.length - 1);
};
