module("isolace/sudoku/Persistence", {
    setup : function() {
        $Persistence.clearAll();
    },
    teardown : function() {
        $Persistence.clearAll();
    }
});

test("constructor", function() {
    ok($Persistence, "$Persistence instanciated");
});

test("get/set string", function() {
    $Persistence.set('test_key', 'c7h21no4');
    equals($Persistence.get('test_key'), 'c7h21no4', "String value persisted");
});

test("get/set number", function() {
    var randomNumber0to100 = Math.floor(Math.random() * 101);
    $Persistence.set('test_key', randomNumber0to100);
    equals($Persistence.get('test_key'), randomNumber0to100, "Number value persisted");
});

test("remove", function() {
    var randomNumber0to100 = Math.floor(Math.random() * 101);
    $Persistence.set('test_key22', randomNumber0to100);
    $Persistence.remove('test_key22');
    equals($Persistence.get('test_key22'), null, "Number value removed");
});

test("add after remove", function() {
    var randomNumber0to100 = Math.floor(Math.random() * 101);
    $Persistence.set('test_key22', randomNumber0to100);
    $Persistence.remove('test_key22');
    $Persistence.set('test_key22', randomNumber0to100);
    equals($Persistence.get('test_key22'), randomNumber0to100, "Number value removed");
});

module("isolace/sudoku/Persistence scores", {
    setup : function() {
        $Persistence.clearAll();
    },
    teardown : function() {
        $Persistence.clearAll();
    }
});

function scoreIsValid(score) {
    ok(score.getDate() > 0, "score has date");
    ok(score.getPuzzleId() >= 0, "score has puzzle id");
    ok(score.getPuzzleLevel() >= 0, "score has puzzle level");
    ok(score.getTime() >= 0, "score has time");
    ok(score.getNumMissed() >= 0, "score has numMissed");
};

test("add set get score", function() {
    var randomNumber200to3600 = 200 + Math.floor(Math.random()*3601);
    var randomNumber0to15 = Math.floor(Math.random()*16);
    var score = $Persistence.addScore(randomNumber200to3600, randomNumber0to15);
    var scores = $Persistence.getScores();
    equals(scores.length, 1, "score added");
});

test("add score valid", function() {
    var randomNumber200to3600 = 200 + Math.floor(Math.random()*3601);
    var randomNumber0to15 = Math.floor(Math.random()*16);
    var score = $Persistence.addScore(randomNumber200to3600, randomNumber0to15);
    ok(score.getDate() > 0, "score has date");
    ok(score.getPuzzleId() >= 0, "score has puzzle id");
    ok(score.getPuzzleLevel() >= 0, "score has puzzle level");
    ok(score.getTime() >= 0, "score has time");
    ok(score.getNumMissed() >= 0, "score has numMissed");
});

test("get score empty", function() {
    var scores = $Persistence.getScores();
    equals(scores.length, 0, "Empty array when on scores in list");
});
