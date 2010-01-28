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
    var html = '';
    for( var i = 0; i <= 9; i++) {
        if(i == 0) {
            html += "<div style='height: 1px; width: 15px; float: left;'>&nbsp; </div>";
        } else {
            html += "<img class='fiftyPercent' style='float: left;' src='../images/45/numbers/" + i + "-marker.png' />";
        }
    }
    html += '<br/>';
    for( var i = 0; i < symbolCount.length; i++) {
        var symbol = i + 1;
        var count = symbolCount[i];
        var imagePath = '../images/45/numbers/'  + symbol + '-marker.png';
        var style = '';
        if(count > 8) {
            style = 'fiftyPercent';
        }
        var img = "<img class='" + style + "' style='float: left;' src='" + imagePath + "' />";
        var bar = '';
        for( var j = 0; j < count; j++) {
            //bar += img;
            bar += "<span style='width: 14px; float: left;' class='ui-icon ui-icon-stop " + style + "'></span>";
        }
        html += img + bar + '<br/>';
    }
    $('#symbolCountView').html(html);
};