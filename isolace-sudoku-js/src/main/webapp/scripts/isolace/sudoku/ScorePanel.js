/**
 * Create a ScorePanel object.
 * @class Displays the user scores.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.ScorePanel = function() {
    this.personalBest = 99999;
};

/**
 * Initialize the panel.
 * @method load
 */
ISOLACE.ScorePanel.prototype.load = function() {

    // $('#scorePanelTable').remove();
    // jQuery("<table style='width: 100%;' cellpadding='0' cellspacing='0'
    // border='0' class='display'
    // id='scorePanelTable'></table>").appendTo('body');

    var scores = $Persistence.getScores();
    var scoreCount = scores.length;
    var sPaginationType = 'two_button';
    // if(scoreCount > 11) {
    // sPaginationType = "full_numbers";
    // }
    var scoresData = [];
    for( var i = 0; i < scores.length; i++) {
        var score = scores[scores.length - 1 - i];
        if(score.getScore() < this.personalBest) {
            this.personalBest = score.getScore();
        }
        var scoreArray = this.scoreToRowData(score);
        scoresData.push(scoreArray);
    }
    this.table = $('#scorePanelTable').dataTable( {
        "bPaginate" : true,
        "sPaginationType" : sPaginationType,
        "bLengthChange" : false,
        "bAutoWidth" : false,
        "bJQueryUI" : true,
        "bFilter" : false,
        "bSort" : false,
        // "sDom": '<"bestScore">frtip',
        "aaData" : scoresData,
        "aaSorting" : [
            [
                    1, "desc"
            ]
        ],
        "aoColumns" : [
                {
                    "sTitle" : "Puzzle Id",
                    "sClass" : "left",
                    "fnRender" : function(oObj) {
                        return "<div style='width: 65px;'>" + oObj.aData[0] + '</div>';
                    }
                }, {
                    "sTitle" : "Date Completed",
                    "sType" : "date",
                    "sClass" : "right",
                    "fnRender" : function(oObj) {
                        return "<div style='width: 135px;'>" + oObj.aData[1].toDateString() + '</div>';
                    }
                }, {
                    "sTitle" : "Time",
                    "sClass" : "right"
                }, {
                    "sTitle" : "Incorrect",
                    "sClass" : "center"
                }, {
                    "sTitle" : "Penalty",
                    "sClass" : "right"
                }, {
                    "sTitle" : "Score",
                    "sClass" : "right"
                }
        ]
    });
    // $('#scorePanelTable')
    // .visualize({type: 'line'})
    // .appendTo('#ScorePanel')
    // .trigger('visualizeRefresh');
};

/**
 * Show the panel.
 * @method show
 * @param {object} options The game options.
 */
ISOLACE.ScorePanel.prototype.show = function(options) {
    var numRows = this.table.fnGetData().length;
    var scores = $Persistence.getScores();
    var scoreCount = scores.length;
    if(numRows < scoreCount) {
        for( var numRows = 0; i < scoreCount; i++) {
            var score = scores[i];
            if(score.getScore() < this.personalBest) {
                this.personalBest = score.getScore();
            }
            var scoreArray = this.scoreToRowData(score);
            this.table.fnAddData(scoreArray);
        }
    }
    if(scoreCount > 0) {
        var bestScore = $SUDOKU_UTIL.formatTime(this.personalBest);
        $("#personalBest").html('<b>Your best score is ' + bestScore + '</b>');
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
    var level = score.getPuzzleLevel();
    var date = new Date(parseInt(score.getDate()));
    var time = $SUDOKU_UTIL.formatTime(score.getTime());
    var nuMissed = score.getNumMissed();
    var penalty = $SUDOKU_UTIL.formatTime(score.getNumMissed() * score.getPenalty());
    var finalTime = $SUDOKU_UTIL.formatTime(score.getScore());
    var scoreArray = [];
    var levelStr = 'Novice';
    if(level == 1) {
        levelStr = 'Easy';
    } else if(level == 2) {
        levelStr = 'Medium';
    } else if(level == 3) {
        levelStr = 'Hard';
    }
    scoreArray.push(levelStr + '-' + puzzleId);
    scoreArray.push(date);
    scoreArray.push(time);
    scoreArray.push(nuMissed);
    scoreArray.push(penalty);
    scoreArray.push(finalTime);

    return scoreArray;
};
