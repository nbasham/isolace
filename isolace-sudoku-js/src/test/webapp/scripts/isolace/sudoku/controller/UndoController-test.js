module("isolace/sudoku/controller/UndoController");

test("constructor", function() {
    var uc = new ISOLACE.sudoku.UndoController(state);
    ok(state.equals(uc.stack[0]), "UndoController instanciated");
});

/*
    init
    stack=0
    sp = 0
    cu = cr = false
    
    add 1
    stack=0,1
    sp=1
    cu = true
    cr = false
    
    add 2
    stack=0,1,2
    sp=2
    cu = true
    cr = false
    
    undo
    stack=0,1,2
    sp=1
    cu = true
    cr = true
    returns 1
    
    add 3
    stack=0,1,3
    sp=2
    cu = true
    cr = false
*/

function checkUndoState(undoController, o) {
    var stack = o.s;
    var stackPtr = o.sp;
    var canUndo = o.cu;
    var canRedo = o.cr;
    equals(undoController.stack.length, stack.length, "Stack lengths equal");
    for( var i= 0; i < stack.length; i++) {
        equals(undoController.stack[i], stack[i], "Stack elements equal");
    }
    equals(undoController.stackPtr, stackPtr, "Stack pointer correct");
    equals(undoController.canUndo(), canUndo, "Can undo correct");
    equals(undoController.canRedo(), canRedo, "Can redo correct");
}


test("undo", function() {
    var uc = new ISOLACE.sudoku.UndoController(0);

    checkUndoState(uc, { s: [0], sp: 0, cu: false, cr: false});
    
    uc.add(1);

    checkUndoState(uc, { s: [0,1], sp: 1, cu: true, cr: false});

    uc.add(2);

    checkUndoState(uc, { s: [0,1,2], sp: 2, cu: true, cr: false});

    var undo1 = uc.undo();

    equals(undo1, 1, "Undo value correct");
    checkUndoState(uc, { s: [0,1,2], sp: 1, cu: true, cr: true});

    uc.add(3);

    checkUndoState(uc, { s: [0,1,3], sp: 2, cu: true, cr: false});

    var undo2 = uc.undo();

    equals(undo2, 1, "Undo value correct");
    checkUndoState(uc, { s: [0,1,3], sp: 1, cu: true, cr: true});

    var redo1 = uc.redo();

    equals(redo1, 3, "Redo value correct");
    checkUndoState(uc, { s: [0,1,3], sp: 2, cu: true, cr: false});
});
