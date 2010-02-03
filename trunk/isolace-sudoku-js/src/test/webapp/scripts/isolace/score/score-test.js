function addScoreData(numToAdd) {
    for( var i = 0; i < numToAdd; i++) {
        var randomNumber200to3600 = 200 + Math.floor(Math.random()*3601);
        var randomNumber0to15 = Math.floor(Math.random()*16);
        $Persistence.addScore(randomNumber200to3600, randomNumber0to15);
    }
};

module("isolace/score/ScoreView", {
    setup: function() {
        $('#scorePanelTable').remove();
        jQuery("<table style='width: 100%;' cellpadding='0' cellspacing='0' border='0' class='display' id='scorePanelTable'></table>").appendTo('body');
    },
    teardown: function() {
    }
});

test("ScorePanel no data", function() {
    var view = new ISOLACE.ScorePanel();
    ok(view, "ScorePanel instantiated");
});

test("ScorePanel lots of data", function() {
    var numToAdd = 20;
    addScoreData(numToAdd);
    var view = new ISOLACE.ScorePanel();
    ok(view, "ScorePanel instantiated");
});


