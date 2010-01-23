module("isolace/sudoku/controller/BoardManager");

test("constructor", function() {
    var bm = new ISOLACE.sudoku.BoardManager(state);
    ok(bm, "BoardManager instanciated");
});

