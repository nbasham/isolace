/**
 * Create a SymbolCountView object.
 * @class Displays the number of times each symbol is currently being played.
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.SymbolCountView = function() {
};

/**
 * Update symbol count HTML.
 * @private
 * @method update
 * @private {array} state An array representing the current state of the board.
 */
ISOLACE.sudoku.SymbolCountView.prototype.update = function(state) {
    var symbolCount = $SUDOKU_UTIL.getSymbolCount(state);
    var html = 'Usage:' + '<br/>';
    for( var i = 0; i < symbolCount.length; i++) {
        var symbol = i + 1;
        var count = symbolCount[i];
        var imagePath = '../images/45/numbers/'  + symbol + '-marker.png';
        if(count > 8) {
            style = 'fiftyPercent';
        }
        var img = "<img class='" + style + "' style='float: left;' src='" + imagePath + "' />";
        var bar = '';
        var style = '';
        for( var j = 0; j < count; j++) {
            bar += img;
            //bar += "<span style='float: left;' class='ui-icon ui-icon-circlesmall-close'></span>";
        }
        html += bar + '<br/>';
    }
    $('#symbolCountView').html(html);
};
