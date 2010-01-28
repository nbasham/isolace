/**
 * Create a ScoresView object.
 * @class Displays the user scores.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.ScoresView = function() {
    var scores = $Scores.get();
    var scoreCount = scores.length;
    var sPaginationType = 'two_button';
    if(scoreCount > 11) {
        sPaginationType = "full_numbers";
    }
    var scoresData = [];
    for( var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var puzzleId = score.getPuzzleId();
        var date = new Date(parseInt(score.getDate())).toLocaleString();
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
        
        scoresData.push(scoreArray);
    }
    $('#scoresViewTable').dataTable({
        "bPaginate": true,
        "sPaginationType": sPaginationType,
        "bLengthChange": false,
        "bAutoWidth": true,
        "bJQueryUI": true,
        "bFilter": false,
        "bSort": false,
        "aaData": scoresData,
        "aoColumns": [
            { "sTitle": "Puzzle", "sClass": "center" },
            { "sTitle": "Date", "sClass": "right" },
            { "sTitle": "Time", "sClass": "right" },
            { "sTitle": "Number Missed", "sClass": "center" },
            { "sTitle": "Penalty", "sClass": "right" },
            { "sTitle": "score", "sClass": "right" }
         ]
    });
//    $('#scoresViewTable')
//    .visualize({type: 'line'})
//    .appendTo('#scoresView')
//    .trigger('visualizeRefresh');
};
