module("isolace/sudoku/model/BoardState");

test("constructor", function() {
    ok(state, "State instanciated");
    for(var i = 0; i < 81; i++) {
        equals(state.state[i], initialState[i]);
    }
});

test("isEditable", function() {
    for(var i = 0; i < 81; i++) {
        if($.inArray(i, revealedIndexes) == -1) {
            ok(state.isEditable(i), "isEditable true");
        } else {
            ok(!state.isEditable(i), "isEditable false");
        }
    }
});

test("setValue", function() {
    state.setValue(6, 0);
    equals(state.getValue(0), 6, "setValue set value");
    state.setValue(values[0], 0);
});

test("setValue toggle", function() {
    state.setValue(6, 0);
    state.setValue(6, 0);
    equals(state.getValue(0), 0, "setValue reset to zero");
    state.setValue(values[0], 0);
});

test("setValue over marker", function() {
    state.setMarkerValue(6, 0);
    state.setValue(6, 0);
    equals(state.getValue(0), 6, "setValue set value");
    state.setValue(values[0], 0);
});

test("setValue on revealed", function() {
    var gotExpectedException = false;
    try {
        state.setValue(6, revealedIndexes[0]);
    } catch(err) {
        gotExpectedException = true;
    }
    equals(state.getValue(revealedIndexes[0]), values[revealedIndexes[0]], "Value should not be changed");
    ok(gotExpectedException, "Got expected exception");
});

test("setValue out of range", function() {
    var gotExpectedException = false;
    try {
        state.setValue(6, -1);
    } catch(err) {
        gotExpectedException = true;
    }
    ok(gotExpectedException, "Got expected exception below lower bounds");
    try {
        state.setValue(6, 81);
    } catch(err) {
        gotExpectedException = true;
    }
    ok(gotExpectedException, "Got expected exception above upper bounds");
});

test("setMarkerValue", function() {
    state.setMarkerValue(6, 0);
    ok(state.hasMarkerValue(6, 0), "hasMarkerValue true");
    state.setValue(values[0], 0);
});

test("setMarkerValue false", function() {
    state.setMarkerValue(6, 0);
    ok(!state.hasMarkerValue(5, 0), "hasMarkerValue false");
    state.setValue(values[0], 0);
});

test("setMarkerValue toggle", function() {
    state.setMarkerValue(6, 0);
    state.setMarkerValue(6, 0);
    ok(!state.hasMarkerValue(6, 0), "hasMarkerValue is toggled");
    state.setValue(values[0], 0);
});

test("setMarkerValue over guess", function() {
    state.setValue(6, 0);
    state.setMarkerValue(6, 0);
    ok(state.hasMarkerValue(6, 0), "hasMarkerValue true");
    state.setValue(values[0], 0);
});

test("hasMarker", function() {
    state.setMarkerValue(6, 0);
    ok(state.hasMarker(0), "hasMarker true");
    state.setValue(values[0], 0);
});

test("hasMarker false", function() {
    ok(!state.hasMarker(revealedIndexes[0]), "hasMarker false");
});

test("hasMarker false revealed", function() {
    ok(!state.hasMarker(revealedIndexes[0]), "hasMarker false, cell revealed");
});

test("hasMarkerValue", function() {
    state.setMarkerValue(6, 0);
    ok(state.hasMarkerValue(6, 0), "hasMarkerValue of 6");
    state.setValue(values[0], 0);
});

test("hasMarkerValue false", function() {
    state.setMarkerValue(6, 0);
    ok(!state.hasMarkerValue(5, 0), "hasMarkerValue of 6, but not 5");
    state.setValue(values[0], 0);
});

test("hasMarkerValue", function() {
    state.setMarkerValue(6, 0);
    ok(state.hasMarkerValue(6, 0), "hasMarkerValue of 6");
    state.setValue(values[0], 0);
});

test("hasMarkerValue no marker", function() {
    ok(!state.hasMarkerValue(6, 0), "hasMarkerValue is false when no marker exists");
});

test("conflicts false", function() {
    ok(!state.conflicts(values[0], 0), "No conflict");
});

test("conflicts row", function() {
    var value = 9;
    ok(state.conflicts(value, 0), "Row conflict");
});

test("conflicts col", function() {
    ok(state.conflicts(values[0], 72), "Column conflict");
});

test("conflicts grid", function() {
    ok(state.conflicts(values[0], 20), "Grid conflict");
});

test("solved", function() {
    var state = new ISOLACE.sudoku.BoardState(values);
    ok(state.solved(puzzle), "Puzzle solved");
});