module("isolace/sudoku/controller/BoardController");

test("constructor", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    ok(bc, "BoardController instanciated");
});

test("guess from event", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    var e = jQuery.Event($Events.GUESS());
    e['value'] = 8;
    e['index'] = 0;
    $(document).trigger(e);
    equals(bc.state.state[0], 8, "Guess value set via event");
});

test("guess", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.guess(8, 0);
    equals(bc.state.state[0], 8, "Guess value set");
});

test("guess toggle", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.guess(8, 0);
    bc.guess(8, 0);
    equals(bc.state.state[0], 0, "Guess value toggled");
});

test("guess clears markers in grid", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.mark(8, 1);
    bc.guess(8, 0);
    ok(!bc.state.hasMarkerValue(8, 1), "Marker cleared by guess");
});

asyncTest("guess fires state changed event", function() {
    expect(1);
    $(document).one($Events.STATE_CHANGE(), function() {
        ok(true, "guess fires state changed event");
        start();
    });
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.guess(8, 0);
});

test("mark", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.mark(8, 0);
    ok(bc.state.hasMarkerValue(8, 0), "Marker set");
});

test("mark from event", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    $Events.fireMark(8, 0);
    ok(bc.state.hasMarkerValue(8, 0), "Marker set via event");
});
test("mark toggle", function() {
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.mark(8, 0);
    bc.mark(8, 0);
    ok(!bc.state.hasMarkerValue(8, 0), "Marker cleared");
});

asyncTest("mark fires state changed event", function() {
    expect(1);
    $(document).one($Events.STATE_CHANGE(), function() {
        ok(true, "Mark fires state changed event");
        start();
    });
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    bc.mark(8, 0);
});

asyncTest("solved event fired", function() {
    expect(1);
    $(document).one($Events.SOLVED(), function() {
        ok(true, "solved event fired");
        start();
    });
    var bc = new ISOLACE.sudoku.BoardController(puzzle);
    for( var i = 0; i < 80; i++) {
        if($.inArray(i, revealedIndexes) == -1) {
            bc.guess(values[i], i);
        }
    }
    bc.guess(values[80], 80);
});
