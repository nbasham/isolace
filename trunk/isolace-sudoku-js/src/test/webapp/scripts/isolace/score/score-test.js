function addScoreData(numToAdd) {
    for( var i = 0; i < numToAdd; i++) {
        var randomNumber200to3600 = 200 + Math.floor(Math.random()*3601);
        var randomNumber0to15 = Math.floor(Math.random()*16);
        $Scores.add(i, randomNumber200to3600, randomNumber0to15);
    }
};

function scoreIsValid(score) {
    ok(score.getDate(), "score has date");
    ok(score.getPuzzleId(), "score has puzzle id");
    ok(score.getTime(), "score has time");
    ok(score.getNumMissed(), "score has numMissed");
};

module("isolace/score/Scores", {
    setup: function() {
        $Persistence.remove('scores');
        $Scores = new ISOLACE.Scores();
    },
    teardown: function() {
        $Persistence.remove('scores');
    }
});

test("$Scores", function() {
    ok($Scores, "$Scores instantiated");
    ok($Scores.add, "$Scores.add");
    ok($Scores.get, "$Scores.get");
    ok($Scores.scoreFromString, "$Scores.scoreFromString");
});

test("$Scores.add", function() {
    $Scores.add(0, 0, 0);
    ok(true, "$Scores.add() no error");
});

//
//test("add returns valid Score", function() {
//    var score = $Scores.add(0, 0, 0);
//    scoreIsValid(score);
//};

test("get empty", function() {
    var scores = $Scores.get();
    ok($.isArray(scores), "get() returns array");
});

test("get returns valid Score object", function() {
    var numToAdd = 4;
    addScoreData(numToAdd);
    var scores = $Scores.get();
    ok($.isArray(scores), "get() returns array");
    equals(scores.length, 4, "Array length");
    var score = scores.pop();
    scoreIsValid(score);
});

test("performance", function() {
    var numToAdd = 1000;
    //addScoreData(numToAdd);
    var startTime = new Date().getTime();
    $Scores.add(1001, 1000, 4);
    var scores = $Scores.get();
    var elapsedTime =  new Date().getTime() - startTime;
    ok(elapsedTime < 1000, '1000 values saved and fetched in ' + elapsedTime + 'ms');
});

module("isolace/score/ScoreView", {
    setup: function() {
        $('#scoresViewTable').remove();
        jQuery("<table style='width: 100%;' cellpadding='0' cellspacing='0' border='0' class='display' id='scoresViewTable'></table>").appendTo('body');
        $Scores = new ISOLACE.Scores();
    },
    teardown: function() {
    }
});

test("ScoresView no data", function() {
    var view = new ISOLACE.ScoresView();
    ok(view, "ScoresView instantiated");
});

test("ScoresView lots of data", function() {
    var numToAdd = 20;
    addScoreData(numToAdd);
    var view = new ISOLACE.ScoresView();
    ok(view, "ScoresView instantiated");
});


