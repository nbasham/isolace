module("isolace/sudoku/view/BoardView");

test("constructor", function() {
    var bv = new ISOLACE.sudoku.BoardView(puzzle, {});
    ok(bv, "BoardView instanciated");
});

test("options default renderer", function() {
    var bv = new ISOLACE.sudoku.BoardView(puzzle);
    ok(bv.renderer.render != undefined, "BoardView has default renderer");
});

test("options default selector", function() {
    var bv = new ISOLACE.sudoku.BoardView(puzzle);
    ok(bv.selector.select != undefined, "BoardView has default selector");
    ok(bv.selector.unselect != undefined, "BoardView has default selector");
});
