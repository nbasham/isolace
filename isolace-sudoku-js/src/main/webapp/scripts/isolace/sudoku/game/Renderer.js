ISOLACE.namespace("sudoku");

/**
 * Creates a Renderer object.
 * @class Renderer renders symbols as colors.
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.Renderer = function() {
    this.renderers = {};
    this.renderers.image = new ISOLACE.sudoku.ImageRenderer();
    this.renderers.color = new ISOLACE.sudoku.ColorRenderer();
    $GameEvent.handleStateChange(this, this.render);
    this.selector = undefined;
    this.markMode = false;
    $GameEvent.handleToggleMarkMode(this, this.handleToggleMarkMode);
};

/**
 * Render all cells based on boardState.
 * @method render
 * @param {BoardState} boardState The current state of the Sudoku board.
 */
ISOLACE.sudoku.Renderer.prototype.render = function(boardState) {
    for(var i = 0; i < 81; i++) {
        var cell = $('#c' + i);
        cell.css('background-image', '');
        cell.css('background-color', 'transparent');
        var hasMarker = boardState.hasMarker(i);
        if(hasMarker) {
            this.getRenderer().renderMarkerCell(boardState, i);
        } else {
            this.getRenderer().renderCell(boardState, i);
        }
    }
    this.renderSymbolCount(boardState.state);
    $Log.debug('Rendered: ' + boardState.state);
};

/**
 * Render all cells as paused.
 * @method render
 */
ISOLACE.sudoku.Renderer.prototype.renderPaused = function() {
    this.renderers.color.renderPaused();
    $Log.debug('Rendered paused board.');
};

/**
 * @private
 */
ISOLACE.sudoku.Renderer.prototype.getRenderer = function() {
    var symbolType = $Options.getSymbolType();
    if(symbolType == 'color') {
        return this.renderers.color;
    }
    return this.renderers.image;
};

/**
 * Update symbol count HTML.
 * @private
 * @method renderSymbolCount
 * @private {array} state An array representing the current state of the board.
 */
ISOLACE.sudoku.Renderer.prototype.renderSymbolCount = function(state) {
    if(this.revealed === undefined) {
        this.getRevealCounts(state);
    }
    var symbolCount = $SUDOKU_UTIL.getSymbolCount(state);
    var html = '';
    for(var i = 0; i <= 9; i++) {
        if(i === 0) {
            html += "<div class='symbolCountHeader'>&nbsp; </div>";
        } else {
            html += "<img class='symbolCountHeader' src='../images/45/numbers/" + i + "-marker.png' />";
        }
    }
    html += '<br/>';
    for(var i = 0; i < symbolCount.length; i++) {
        var symbol = i + 1;
        var count = symbolCount[i];
        var imagePath = '../images/45/numbers/'  + symbol + '-marker.png';
        var style = '';
        if(count > 8) {
            style = 'fiftyPercent';
        }
        var img = "<img class='" + style + "' style='float: left;' src='" + imagePath + "' />";
        var bar = '';
        var numRevealed = this.revealed[i];
        for( var j = 0; j < count; j++) {
            bar += this.getRenderer().renderCountSymbol(i);
        }
        html += img + bar + '<br/>';
    }
    $('#symbolCountView').html(html);
};

/**
 * Update symbol count HTML.
 * @private
 * @method update
 * @private {array} state An array representing the current state of the board.
 */
ISOLACE.sudoku.Renderer.prototype.getRevealCounts = function(state) {
    this.revealed = [0,0,0,0,0,0,0,0,0];
    for( var i = 0; i < state.length; i++) {
        var value = state[i];
        if(value > 0) {
            this.revealed[value-10]++;
        }
    }
};

/**
 */
ISOLACE.sudoku.Renderer.prototype.renderBoard = function() {
    var cellIndex = 0;
    var html = '';
    html += "<div id='board' class='board'>";
    for( var row = 0; row < 9; row++) {
        html += "<div class='cellrow'>";
        for( var col = 0; col < 9; col++) {
            var gridClass = 'oddGrid';
            if($SUDOKU_UTIL.getGridFromIndex(cellIndex) % 2 === 0) {
                gridClass = 'evenGrid';
            }
            var row = $SUDOKU_UTIL.getRowFromIndex(cellIndex);
            if (row == 2 || row == 5) {
                gridClass += ' rowBorder';
            }
            var col = $SUDOKU_UTIL.getColFromIndex(cellIndex);
            if (col == 2 || col == 5) {
                gridClass += ' colBorder';
            }
            html += "<div id='c" + cellIndex + "' class='cell " + gridClass + "'>&nbsp;</div>";
            cellIndex++;
        }
        html += "</div>";
    }
    html += "</div>";

    $('#boardView').html(html);
};

/**
 * @method renderSelector
 */
ISOLACE.sudoku.Renderer.prototype.renderSelector = function(index) {
    if(this.selector === undefined) {
        this.selector = $('<img/>', {
            src: '../images/45/numbers/select.png',
            id: 'selector'
        }).appendTo('.board');
        this.marker = $('<div/>', {
            id: 'selectorMarker',
            'class': 'ui-icon ui-icon-pencil fiftyPercent'
        }).appendTo('.board').hide();
    }
    var cell = $('#c' + index);
    var t = cell.offset().top;
    var l = cell.position().left;
    this.selector.css('top', t);
    this.selector.css('left', l);
    this.selector.css('display', 'block');

    this.marker.css('top', t + 16);
    this.marker.css('left', l + 16);
    $Log.debug('Rendered selector at index ' + index + '.');
};

/**
 * Handle a toggle mark mode event.
 * 
 * @method handleToggleMarkMode
 * @private
 */
ISOLACE.sudoku.Renderer.prototype.handleToggleMarkMode = function() {
    this.markMode = !this.markMode;
    if(this.markMode) {
        this.marker.css('display', 'block');
    } else {
        this.marker.css('display', 'none');
    }
};

if(typeof $Renderer == "undefined" || !$Renderer) {
    /**
     * Global player Renderer.
     * @class ISOLACE.sudoku.Renderer
     * @static
     */
    var $Renderer = new ISOLACE.sudoku.Renderer();
}