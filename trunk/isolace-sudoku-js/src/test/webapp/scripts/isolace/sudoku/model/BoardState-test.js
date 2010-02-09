module("isolace/sudoku/model/BoardState", {
    setup : function() {
        var refCopy = initialState.concat();
        this.state = new ISOLACE.sudoku.BoardState(values, refCopy);
    },
    teardown : function() {
    }
});

test("constructor", function() {
    ok(this.state, "State instanciated");
    for(var i = 0; i < 81; i++) {
        equals(this.state.state[i], initialState[i]);
    }
});

test("isEditable", function() {
    for(var i = 0; i < 81; i++) {
        if($.inArray(i, revealedIndexes) == -1) {
            ok(this.state.isEditable(i), "isEditable true");
        } else {
            ok(!this.state.isEditable(i), "isEditable false");
        }
    }
});

test("setValue", function() {
    this.state.setValue(6, 0);
    equals(this.state.getValue(0), 6, "setValue set value");
    this.state.setValue(values[0], 0);
});

test("setValue toggle", function() {
    this.state.setValue(6, 0);
    this.state.setValue(6, 0);
    equals(this.state.getValue(0), 0, "setValue reset to zero");
    this.state.setValue(values[0], 0);
});

test("setValue over marker", function() {
    this.state.setMarkerValue(6, 0);
    this.state.setValue(6, 0);
    equals(this.state.getValue(0), 6, "setValue set value");
    this.state.setValue(values[0], 0);
});

test("setValue on revealed", function() {
    var gotExpectedException = false;
    try {
        this.state.setValue(6, revealedIndexes[0]);
    } catch(err) {
        gotExpectedException = true;
    }
    equals(this.state.getValue(revealedIndexes[0]), values[revealedIndexes[0]], "Value should not be changed");
    ok(gotExpectedException, "Got expected exception");
});

test("setValue out of range", function() {
    var gotExpectedException = false;
    try {
        this.state.setValue(6, -1);
    } catch(err) {
        gotExpectedException = true;
    }
    ok(gotExpectedException, "Got expected exception below lower bounds");
    try {
        this.state.setValue(6, 81);
    } catch(err) {
        gotExpectedException = true;
    }
    ok(gotExpectedException, "Got expected exception above upper bounds");
});

test("setMarkerValue", function() {
    this.state.setMarkerValue(6, 0);
    ok(this.state.hasMarkerValue(6, 0), "hasMarkerValue true");
    this.state.setValue(values[0], 0);
});

test("setMarkerValue false", function() {
    this.state.setMarkerValue(6, 0);
    ok(!this.state.hasMarkerValue(5, 0), "hasMarkerValue false");
    this.state.setValue(values[0], 0);
});

test("setMarkerValue toggle", function() {
    this.state.setMarkerValue(6, 0);
    this.state.setMarkerValue(6, 0);
    ok(!this.state.hasMarkerValue(6, 0), "hasMarkerValue is toggled");
    this.state.setValue(values[0], 0);
});

test("setMarkerValue over guess", function() {
    this.state.setValue(6, 0);
    this.state.setMarkerValue(6, 0);
    ok(this.state.hasMarkerValue(6, 0), "hasMarkerValue true");
    this.state.setValue(values[0], 0);
});

test("hasMarker", function() {
    this.state.setMarkerValue(6, 0);
    ok(this.state.hasMarker(0), "hasMarker true");
    this.state.setValue(values[0], 0);
});

test("hasMarker false", function() {
    ok(!this.state.hasMarker(revealedIndexes[0]), "hasMarker false");
});

test("hasMarker false revealed", function() {
    ok(!this.state.hasMarker(revealedIndexes[0]), "hasMarker false, cell revealed");
});

test("hasMarkerValue", function() {
    this.state.setMarkerValue(6, 0);
    ok(this.state.hasMarkerValue(6, 0), "hasMarkerValue of 6");
    this.state.setValue(values[0], 0);
});

test("hasMarkerValue false", function() {
    this.state.setMarkerValue(6, 0);
    ok(!this.state.hasMarkerValue(5, 0), "hasMarkerValue of 6, but not 5");
    this.state.setValue(values[0], 0);
});

test("hasMarkerValue", function() {
    this.state.setMarkerValue(6, 0);
    ok(this.state.hasMarkerValue(6, 0), "hasMarkerValue of 6");
    this.state.setValue(values[0], 0);
});

test("hasMarkerValue no marker", function() {
    ok(!this.state.hasMarkerValue(6, 0), "hasMarkerValue is false when no marker exists");
});

test("conflicts false", function() {
    ok(!this.state.conflicts(values[0], 0), "No conflict");
});

test("conflicts row", function() {
    var value = 9;
    ok(this.state.conflicts(value, 0), "Row conflict");
});

test("conflicts col", function() {
    ok(this.state.conflicts(6, 0), "Column conflict");
});

test("conflicts grid", function() {
    ok(this.state.conflicts(1, 0), "Grid conflict");
});

test("solved", function() {
    var state = new ISOLACE.sudoku.BoardState(values, values);
    ok(state.solved(puzzle), "Puzzle solved");
});