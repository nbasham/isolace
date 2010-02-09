$(document).ready(function() {
    if(!$Options.useTooltips) {
        return;
    }
    var normalOptions = {
            track : true,
            delay : 0,
            showBody : " - ",
            showURL : false
        };
    var spoutOptions = {
            track : true,
            delay : 0,
            showURL : false,
            fixPNG : true,
            showBody : " - ",
            extraClass : "pretty fancy",
            top : -15,
            left : 5
        };
    var spoutDownOptions = {
            track : true,
            delay : 0,
            showURL : false,
            fixPNG : true,
            showBody : " - ",
            extraClass: 'pretty spout-left-down',
            top : 30,
            left : 5
    }
    
    //  tabs
    $('#aboutTab').attr('title', "About - Visit this tab for general informations.");
    $('#optionTab').attr('title', "Options - <span class='ui-icon ui-icon-closethick'/>Visit this tab to customize Sudoku.");
    $('#playTab').attr('title', "Play - Visit this tab to play Sudoku.");
    $('#myScoresTab').attr('title', "My Scores - Visit this tab to see your score history.");
    $('.tabtt').tooltip(normalOptions);

    //  toolbar
    $('#undoButton').attr('title', "Undo - Click this button to undo your last move. This button is only active after you've made a guess.");
    $('#undoButton').tooltip(normalOptions);
    $('#redoButton').attr('title', "Redo - Click this button to redo the previous undo. This button is only active after an undo.");
    $('#redoButton').tooltip(normalOptions);
    $('#pauseButton').attr('title', "Pause - Click this button to pause the game.");
    $('#pauseButton').tooltip(normalOptions);
    $('#skipButton').attr('title', "Skip - Click this button to skip this game and move on to the next one.");
    $('#skipButton').tooltip(normalOptions);
    $('#timerButton').attr('title', "Show or Hide Timer - Click this button to show or hide the timer. The timer displays the amount of time you've been playing.");
    $('#timerButton').tooltip(normalOptions);
    $('#usageButton').attr('title', "Show or Hide Usage Chart - Click this button to show or hide the usage chart. The usage chart shows how many times each symbol has been used.");
    $('#usageButton').tooltip(normalOptions);
    $('#markConflictButton').attr('title', "Show Marker Conflicts - This setting changes the marker color to red when that marker conflicts.");
    $('#markConflictButton').tooltip(normalOptions);
    $('#guessConflictButton').attr('title', "Show Guess Conflicts - This setting changes a guess color to red when that guess is incorrect.");
    $('#guessConflictButton').tooltip(normalOptions);
    $('#numberSymbolButton').attr('title', "Number Symbols - Play Sudoku with numbers, this is the standard way to play.");
    $('#numberSymbolButton').tooltip(normalOptions);
    $('#colorSymbolButton').attr('title', "Color Symbols - Play Sudoku with colors instead of numbers.");
    $('#colorSymbolButton').tooltip(normalOptions);
});
