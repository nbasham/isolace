/**
 * Create a ScorePanel object.
 * @class Displays the user scores.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.ScorePanel = function() {
};

/**
 * Initialize the panel.
 * @method load
 */
ISOLACE.ScorePanel.prototype.load = function() {

    //$('#scorePanelTable').remove();
    //jQuery("<table style='width: 100%;' cellpadding='0' cellspacing='0' border='0' class='display' id='scorePanelTable'></table>").appendTo('body');

    var scores = $Scores.get();
    var scoreCount = scores.length;
    var sPaginationType = 'two_button';
//    if(scoreCount > 11) {
//        sPaginationType = "full_numbers";
//    }
    var scoresData = [];
    for( var i = 0; i < scores.length; i++) {
        var score = scores[scores.length - 1 - i];
        var scoreArray = this.scoreToRowData(score);
        scoresData.push(scoreArray);
    }
    this.table = $('#scorePanelTable').dataTable({
        "bPaginate": true,
        "sPaginationType": sPaginationType,
        "bLengthChange": false,
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bFilter": false,
        "bSort": false,
        "aaData": scoresData,
        "aaSorting": [[ 1, "desc" ]],
        "aoColumns": [
            { "sTitle": "Puzzle Id", "sClass": "center" },
            {
                    "sTitle" : "Date Completed",
                    "sType" : "date",
                    "sClass" : "right",
                    "fnRender" : function(oObj) {
                        return "<div style='width: 135px;'>" + oObj.aData[1].toDateString() + '</div>';
                    }
                },
            { "sTitle": "Completion Time", "sClass": "right" },
            { "sTitle": "Incorrect Guesses", "sClass": "center" },
            { "sTitle": "Penalty Time", "sClass": "right" },
            { "sTitle": "Total Time", "sClass": "right" }
         ]
    });
//    $('#scorePanelTable')
//    .visualize({type: 'line'})
//    .appendTo('#ScorePanel')
//    .trigger('visualizeRefresh');
};

/**
 * Show the panel.
 * @method show
 * @param {object} options The game options.
 */
ISOLACE.ScorePanel.prototype.show = function(options) {
    var numRows = this.table.fnGetData().length;
    var scores = $Scores.get();
    var scoreCount = scores.length;
    if(numRows < scoreCount) {
        for( var numRows = 0; i < scoreCount; i++) {
            var score = scores[i];
            var scoreArray = this.scoreToRowData(score);
            this.table.fnAddData(scoreArray);
        }
    }
};


/**
 * Convert a Score object to an array of row data.
 * @method scoreToRowData
 * @private
 * @param {Score} score The Score object to convert to data.
 */
ISOLACE.ScorePanel.prototype.scoreToRowData = function(score) {
    var puzzleId = score.getPuzzleId();
    var date = new Date(parseInt(score.getDate()));
    var time = $SUDOKU_UTIL.formatTime(score.getTime());
    var nuMissed = score.getNumMissed();
    var penalty = $SUDOKU_UTIL.formatTime(score.getNumMissed() * score.getPenalty());
    var finalTime = $SUDOKU_UTIL.formatTime(score.getScore());
    var scoreArray = [];
    scoreArray.push(puzzleId);
    scoreArray.push(date);
    scoreArray.push(time);
    scoreArray.push(nuMissed);
    scoreArray.push(penalty);
    scoreArray.push(finalTime);
    
    return scoreArray;
};
