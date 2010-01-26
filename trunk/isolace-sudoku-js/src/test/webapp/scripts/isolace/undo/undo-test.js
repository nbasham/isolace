module("isolace/undo/UndoView", {
    setup: function() {
        jQuery('<input/>', {
            id: 'undoButton',
            type: 'button'
        }).appendTo('body');
        jQuery('<input/>', {
            id: 'redoButton',
            type: 'button'
        }).appendTo('body');
        this.uv = new ISOLACE.UndoView();
    },
    teardown: function() {
        $('#undoButton').remove();
        $('#redoButton').remove();
        $UndoEvent.unbind();
    }
});

test("UndoView", function() {
    ok(this.uv, "UndoView instantiated");
});

asyncTest("Trigger undo", function() {
    expect(1);
    $UndoEvent.handleUndoRequestEvent(this.uv, function(isRedo) {
        ok(!isRedo, "Undo triggered");
        start();
    });
    $('#undoButton').trigger('click');
});

asyncTest("Trigger redo", function() {
    expect(1);
    $UndoEvent.handleUndoRequestEvent(this.uv, function(isRedo) {
        ok(isRedo, "Redo triggered");
        start();
    });
    $('#redoButton').trigger('click');
});

module("isolace/undo/UndoEvent", {
  setup: function() {
  },
  teardown: function() {
      $UndoEvent.unbind();
  }
});

test("$UndoEvent", function() {
    ok($UndoEvent, "$UndoEvent defined");
});

asyncTest("UpdateUndoUIEvent", function() {
    expect(2);
    $UndoEvent.handleUpdateUndoUIEvent(this.uc, function(canUndo, canRedo) {
        ok(canUndo, "canUndo passed to handler");
        ok(!canRedo, "canRedo passed to handler");
        start();
    });
    $UndoEvent.fireUpdateUndoUIEvent(true, false);
});

asyncTest("SubmitUndoRecordEvent", function() {
    expect(1);
    $UndoEvent.handleSubmitUndoRecordEvent(this.uc, function(data) {
        ok(data, "data passed to handler");
        start();
    });
    $UndoEvent.fireSubmitUndoRecordEvent(true, false);
});


asyncTest("UndoEvent", function() {
    expect(1);
    $UndoEvent.handleUndoEvent(this.uc, function(data) {
        ok(8, "data passed to handler");
        start();
    });
    $UndoEvent.fireUndoEvent(8);
});


asyncTest("UndoRequestEvent", function() {
    expect(1);
    $UndoEvent.handleUndoRequestEvent(this.uc, function(isRedo) {
        ok(isRedo, "isRedo passed to handler");
        start();
    });
    $UndoEvent.fireUndoRequestEvent(true);
});

module("isolace/undo/UndoController", {
  setup: function() {
    this.uc = new ISOLACE.UndoController(0);
  },
  teardown: function() {
      $UndoEvent.unbind();
  }
});

test('constructor', function() {
    ok(this.uc, "instantiated");
});

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

    checkUndoState(this.uc, { s: [0], sp: 0, cu: false, cr: false});
    
    this.uc.add(1);

    checkUndoState(this.uc, { s: [0,1], sp: 1, cu: true, cr: false});

    this.uc.add(2);

    checkUndoState(this.uc, { s: [0,1,2], sp: 2, cu: true, cr: false});

    var undo1 = this.uc.undo();

    equals(undo1, 1, "Undo value correct");
    checkUndoState(this.uc, { s: [0,1,2], sp: 1, cu: true, cr: true});

    this.uc.add(3);

    checkUndoState(this.uc, { s: [0,1,3], sp: 2, cu: true, cr: false});

    var undo2 = this.uc.undo();

    equals(undo2, 1, "Undo value correct");
    checkUndoState(this.uc, { s: [0,1,3], sp: 1, cu: true, cr: true});

    var redo1 = this.uc.redo();

    equals(redo1, 3, "Redo value correct");
    checkUndoState(this.uc, { s: [0,1,3], sp: 2, cu: true, cr: false});
});

test("constructor binds SubmitUndoRecordEvent", function() {
    var len = this.uc.stack.length;
    $UndoEvent.fireSubmitUndoRecordEvent(4);
    var newLen = this.uc.stack.length;
    equals(len, newLen - 1, 'handleUndoEvent was handled');
});

asyncTest("constructor binds UndoRequestEvent which fires UndoEvent", function() {
    expect(2);
    var expectedValue;
    $UndoEvent.fireSubmitUndoRecordEvent(1);
    $UndoEvent.fireSubmitUndoRecordEvent(2);
    $UndoEvent.handleUndoEvent(this, function(data) {
        equals(data, expectedValue, "UndoEvent fired");
        start();
    });
    expectedValue = 1;
    $UndoEvent.fireUndoRequestEvent(false);
    expectedValue = 2;
    $UndoEvent.fireUndoRequestEvent(true);
});

asyncTest("constructor binds UndoRequestEvent which fires UpdateUndoUIEvent", function() {
    expect(4);
    $UndoEvent.fireSubmitUndoRecordEvent(1);
    $UndoEvent.fireSubmitUndoRecordEvent(2);
    $UndoEvent.handleUpdateUndoUIEvent(this, function(canUndo, canRedo) {
        ok(canUndo !== undefined, "UpdateUndoUIEvent fired with canUndo");
        ok(canRedo !== undefined, "UpdateUndoUIEvent fired with canRedo");
        start();
    });
    $UndoEvent.fireUndoRequestEvent(false);
    $UndoEvent.fireUndoRequestEvent(true);
});

asyncTest("add fires UpdateUndoUIEvent", function() {
    expect(2);
    $UndoEvent.handleUpdateUndoUIEvent(this, function(canUndo, canRedo) {
        equals(canUndo, true, "UpdateUndoUIEvent fired with canUndo");
        equals(canRedo, false, "UpdateUndoUIEvent fired with canRedo");
        start();
    });
    this.uc.add(4);
});

