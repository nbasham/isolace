module("isolace/sudoku/Util");

test("$SUDOKU_UTIL", function() {
    ok($SUDOKU_UTIL, "$SUDOKU_UTIL instantiated");
});

test("getSymbolCount 0", function() {
    var a = [-1,0,0];
    var aa = $SUDOKU_UTIL.getSymbolCount(a);
    for( var i = 0; i < aa.length; i++) {
        var item = aa[i];
        equals(item, 0, "Count for symbol " + (i + 1) + ' is correct');
    }
});

test("getSymbolCount 1", function() {
    var a = [-1,0,1,2,3,4,5,6,7,8,9];
    var aa = $SUDOKU_UTIL.getSymbolCount(a);
    for( var i = 0; i < aa.length; i++) {
        var item = aa[i];
        equals(item, 1, "Count for symbol " + (i + 1) + ' is correct');
    }
});

test("getSymbolCount 2", function() {
    var a = [-1,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9];
    var aa = $SUDOKU_UTIL.getSymbolCount(a);
    for( var i = 0; i < aa.length; i++) {
        var item = aa[i];
        equals(item, 2, "Count for symbol " + (i + 1) + ' is correct');
    }
});


