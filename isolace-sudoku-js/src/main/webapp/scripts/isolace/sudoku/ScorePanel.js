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
    this.myScoreTable = undefined;
    var tableSettings = {
        "destroy" : true,
        "bPaginate" : true,
        "sPaginationType" : 'two_button',
        "bLengthChange" : false,
        "bAutoWidth" : false,
        "bJQueryUI" : true,
        "bFilter" : false,
        "bSort" : false,
        "aaSorting" : [
            [
                    1, "desc"
            ]
        ],
        "aoColumns" : [
                {
                    "sTitle" : "Date",
                    "sType" : "date",
                    "sClass" : "right"
                }, {
                    "sTitle" : "Level",
                    "sClass" : "left"
                }, {
                    "sTitle" : "Score",
                    "sClass" : "right"
                }
        ]
    };
    this.myScoreTable = $('#scorePanelTable').dataTable(tableSettings);
    var nCloneTh = document.createElement( 'th' );
    $('#scorePanelTable thead tr').each(function() {
        this.insertBefore(nCloneTh, this.childNodes[0]);
    });
};

/**
 * Show the panel.
 * @method show
 */
ISOLACE.ScorePanel.prototype.show = function() {
    if(this.myScoreTable !== undefined) {
        this.myScoreTable.fnClearTable();
    }

    var scores = $Persistence.getScores();
    if(scores.length > 0) {
        var personalBest = 99999;
        for( var i = 0; i < scores.length; i++) {
            var score = scores[i];
            if(score.getScore() < personalBest) {
                personalBest = score.getScore();
            }
            var scoreArray = this.scoreToRowData(score);
            this.myScoreTable.fnAddData(scoreArray);
        }
        this.myScoreTable.fnDraw();

        $("#personalBest").html('<b>Your best score is ' + $SUDOKU_UTIL.formatTime(personalBest) + '</b>');

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTd = document.createElement( 'td' );
        nCloneTd.innerHTML = "<span class='ui-icon ui-icon-circle-plus' title='Click on this to see more details about this score'></span>";
        nCloneTd.className = "center";
        
        $('#scorePanelTable tbody tr').each(function() {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });
        
        var myScoreTableRef = this.myScoreTable;
        $('td span', this.myScoreTable.fnGetNodes()).each(function() {
            $(this).click(function() {
                var nTr = this.parentNode.parentNode;
                    if($(this).hasClass('ui-icon-circle-minus')) {
                        /* This row is already open - close it */
                        $(this).removeClass('ui-icon-circle-minus');
                        $(this).addClass('ui-icon-circle-plus');
                        $(this).attr('title', 'Click on this to see more details about this score');
                        myScoreTableRef.fnClose(nTr);
                    } else {
                        /* Open this row */
                        $(this).removeClass('ui-icon-circle-plus');
                        $(this).addClass('ui-icon-circle-minus');
                        $(this).attr('title', 'Click on this to hide the score details');
                        var aPos = myScoreTableRef.fnGetPosition(nTr);
                        var score = scores[aPos];
                        myScoreTableRef.fnOpen(nTr, score.toTable(), 'details');
                    }
                });
        });
    }
};
/**
 * Convert a Score object to an array of row data.
 * @method scoreToRowData
 * @private
 * @param {Score} score The Score object to convert to data.
 */
ISOLACE.ScorePanel.prototype.scoreToRowData = function(score) {
    var levelStr = $SUDOKU_UTIL.levelToString(score.getPuzzleLevel());
    var finalTime = $SUDOKU_UTIL.formatTime(score.getScore());
    var date = new Date(parseInt(score.getDate()));
    var scoreArray = [];
    scoreArray.push(myPrettyDate(date));
    scoreArray.push(levelStr);
    scoreArray.push(finalTime);

    return scoreArray;
};
