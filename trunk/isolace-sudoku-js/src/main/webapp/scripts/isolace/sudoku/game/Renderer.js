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

if(typeof $Renderer == "undefined" || !$Renderer) {
    /**
     * Global player Renderer.
     * @class ISOLACE.sudoku.Renderer
     * @static
     */
    var $Renderer = new ISOLACE.sudoku.Renderer();
}