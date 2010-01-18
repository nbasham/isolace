ISOLACE.namespace("sudoku");

/**
 * Creates HTML for a Sudoku board. Assumes an HTML DIV element
 * with id 'boardPanel'.
 * 
 * @namespace ISOLACE.sudoku.view
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @class BoardView
 * @param {Puzzle} The puzzle to solve.
 * @param {object} The options to apply to the board.
 * <pre>
 *      all options are optional
 *      selector {object}   - Object to render cells. Default is TextRenderer.
 *      renderer {object}   - Object to handle cell selection. Default is BorderSelector.
 *      showTimer {boolean} - true if timer view should be displayed. Default is true.
 * </pre>
 */
ISOLACE.sudoku.BoardView = function(puzzle, options) {
    this.puzzle = puzzle;
    this.options = options;
    $('*').unbind();
    $('#boardView').html(this.generateHtml());
    
    this.initializeOptions(this.options);
    this.stylizeGridColors();
    this.stylizeGridBorders();

    this.controller = new ISOLACE.sudoku.BoardController(puzzle);
    $Events.handleSolved(this, this.puzzleSolved);
    var jsLintLikesThis = new ISOLACE.sudoku.BoardViewEvents(this, puzzle);
    var jsLintLikesThis2 = new ISOLACE.sudoku.TimerView();
};

ISOLACE.sudoku.BoardView.prototype.show = function() {
    this.renderer.render(this.controller.state);
};

ISOLACE.sudoku.BoardView.prototype.hide = function() {
    $('#boardView').hide();
};

ISOLACE.sudoku.BoardView.prototype.start = function() {
    $Log.log("Hello world!", "info",  "myapp"); 
    if(this.showTimer) {
        $('#timerView').css('display', 'block');
    }
    $Events.fireTimerStart();
};

ISOLACE.sudoku.BoardView.prototype.puzzleSolved = function(seconds) {
    var me = this;
    $("#solvedView").dialog( {
        modal : true,
        title : 'Puzzle Solved',
        buttons: { "Ok": function() { $(this).dialog("close"); $Events.fireShowMainMenu } }
    }).html('You solved the puzzle in ' + seconds + ' seconds.');
};

/**
 * @private
 */
ISOLACE.sudoku.BoardView.prototype.generateHtml = function() {
    var cellIndex = 0;
    var html = '';
    html += "<div id='board' class='board'>";
    for(var row = 0; row < 9; row++) {
        html += "<div class='cellrow'>";
        for(var col = 0; col < 9; col++) {
            html += "<div id='c" + cellIndex + "' class='cell'>&nbsp;</div>";
            cellIndex++;
        }
        html += "</div>";
    }
    html += "</div>";
    
    return html;
};

/**
 * @private
 */
ISOLACE.sudoku.BoardView.prototype.stylizeGridColors = function() {
    $('.cell').each( function(i, el) {
        if ($SUDOKU_UTIL.getGridFromIndex(i) % 2 === 0) {
            $(el).addClass('evenGrid');
        } else {
            $(el).addClass('oddGrid');
        }
    });
};

/**
 * @private
 */
ISOLACE.sudoku.BoardView.prototype.stylizeGridBorders = function() {
    $('.cell').each(function(i, el) {
        var row = $SUDOKU_UTIL.getRowFromIndex(i);
        if (row == 2 || row == 5) {
            $(el).addClass('rowBorder');
        }
        var col = $SUDOKU_UTIL.getColFromIndex(i);
        if (col == 2 || col == 5) {
            $(el).addClass('colBorder');
        }
    });
};


/**
 * @private
 */
ISOLACE.sudoku.BoardView.prototype.initializeOptions = function(o) {
    if(o === null || o === undefined) {
        o = {};
    }
    
    if(o.showTimer === undefined) {
        o.showTimer = true;
    }
    this.showTimer = o.showTimer;
    
    if(o.renderer === undefined) {
        o.renderer = new ISOLACE.sudoku.TextRenderer();
    }
    this.renderer = o.renderer;
    
    if(o.selector === undefined) {
        o.selector = new ISOLACE.sudoku.BorderSelector();
    }
    this.selector = o.selector;
};