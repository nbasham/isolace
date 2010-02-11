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
var oTable;
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
        var score = scores[i];
        if(score.getScore() < this.personalBest) {
            this.personalBest = score.getScore();
        }
        var scoreArray = this.scoreToRowData(score);
        scoresData.push(scoreArray);
    }
    oTable = this.table = $('#scorePanelTable').dataTable( {
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
                    "sTitle" : "Date",
                    "sType" : "date",
                    "sClass" : "right",
                    "fnRender" : function(oObj) {
                        var date = new Date(parseInt(oObj.aData[0].getDate()));
                        return "<div style='width: 135px;'>" + myPrettyDate(date) + '</div>';
                    }
                }, {
                    "sTitle" : "Level",
                    "sClass" : "left",
                    "fnRender" : function(oObj) {
                        return "<div style='width: 65px;'>" + oObj.aData[1] + "</div>";
                    }
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
    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */

    /*
     * Insert a 'details' column to the table
     */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = "<span class='ui-icon ui-icon-circle-plus' title='Click on this to see more details about this score'></span>";
    nCloneTd.className = "center";
    
    $('#scorePanelTable thead tr').each(function() {
        this.insertBefore(nCloneTh, this.childNodes[0]);
    });

    $('#scorePanelTable tbody tr').each(function() {
        this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
    });
    $('td span', oTable.fnGetNodes()).each(function() {
        $(this).click(function() {
            var nTr = this.parentNode.parentNode;
            //$(this).html("<span class='ui-icon'></span>");
            if($(this).hasClass('ui-icon-circle-minus')) {
                $(this).removeClass('ui-icon-circle-minus');
                $(this).addClass('ui-icon-circle-plus');
                $(this).attr('title', 'Click on this to see more details about this score');
                /* This row is already open - close it */
                oTable.fnClose(nTr);
            } else {
                /* Open this row */
                $(this).removeClass('ui-icon-circle-plus');
                $(this).addClass('ui-icon-circle-minus');
                $(this).attr('title', 'Click on this to hide the score details');
                var aPos = oTable.fnGetPosition(nTr);
                var score = scores[aPos];
                oTable.fnOpen(nTr, fnFormatDetails(score), 'details');
            }
        });
    });
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
        for( var i = numRows; i < scoreCount; i++) {
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
/*
    this.puzzleId = undefined;
    this.puzzleLevel = undefined;
    this.date = undefined;
    this.time = undefined;
    this.numMissed = undefined;
    this.userId = undefined;
    this.symbolType = undefined;

Date Level Score

Puzzle  Evil 3
Date    long date
Symbol  Number/Color
Play time   00:00
Incorrect guesses   3
Penalty time    00:00
Score   00:00
*/
/**
 * Convert a Score object to an array of row data.
 * @method scoreToRowData
 * @private
 * @param {Score} score The Score object to convert to data.
 */
ISOLACE.ScorePanel.prototype.scoreToRowData = function(score) {
    var levelStr = $SUDOKU_UTIL.levelToString(score.getPuzzleLevel());
    var finalTime = $SUDOKU_UTIL.formatTime(score.getScore());
    var scoreArray = [];
    scoreArray.push(score);
    scoreArray.push(levelStr);
    scoreArray.push(finalTime);

    return scoreArray;
};

function fnFormatDetails(score) {
    var puzzleId = score.getPuzzleId();
    var level = $SUDOKU_UTIL.levelToString(score.getPuzzleLevel());
    var date = new Date(parseInt(score.getDate()));
    var time = $SUDOKU_UTIL.formatTime(score.getTime());
    var nuMissed = score.getNumMissed();
    var penalty = $SUDOKU_UTIL.formatTime(score.getNumMissed() * score.getPenalty());
    var finalTime = $SUDOKU_UTIL.formatTime(score.getScore());
    var symbolType = score.getSymbolType() == 0 ? 'Number' : 'Color' + "&nbsp;<img src='../images/colors.png'>";
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Puzzle:</td><td>' + level + ' ' + puzzleId + '</td></tr>';
    sOut += '<tr><td>Date:</td><td>' + dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT") + '</td></tr>';
    sOut += '<tr><td>Symbol Type:</td><td>' + symbolType + '</td></tr>';
    sOut += '<tr><td>Play Time:</td><td>' + time + '</td></tr>';
    sOut += '<tr><td>Incorrect guesses:</td><td>' + nuMissed + '</td></tr>';
    sOut += '<tr><td>Penalty:</td><td>' + penalty + '</td></tr>';
    sOut += '<tr><td>Score:</td><td>' + finalTime + '</td></tr>';
    sOut += '</table>';

    return sOut;
}

