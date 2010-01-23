module("isolace/sudoku/Persistence");

test("constructor", function() {
    ok($Persistence, "$Persistence instanciated");
});

test("get/set string", function() {
    $Persistence.set('test_key', 'c7h21no4');
    equals($Persistence.get('test_key'), 'c7h21no4', "String value persisted");
});

test("get/set number", function() {
    var randomNumber0to100 = Math.floor(Math.random()*101)
    $Persistence.set('test_key', randomNumber0to100);
    equals($Persistence.get('test_key'), randomNumber0to100, "Number value persisted");
});
