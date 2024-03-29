ISOLACE.namespace("sudoku");

/**
 * Creates a ColorRenderer object.
 * @class ColorRenderer renders symbols as colors.
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.ColorRenderer = function() {
    this.styles = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
};

/**
 * Get the HTML to represent a symbol in the symbol count view.
 * @method renderCountSymbol
 * @param {int} symbolIndex The index of the symbol to render.
 */
ISOLACE.sudoku.ColorRenderer.prototype.renderCountSymbol = function(symbolIndex) {
    var countSymbol = "<div class='colorSymbolCount " + this.styles[symbolIndex+1] + "'>&nbsp;</div>";
    return countSymbol;
};

/**
 */
ISOLACE.sudoku.ColorRenderer.prototype.renderMarkerCell = function(boardState, index) {
    var parentCell = $('#c' + index);
    parentCell.css('background-color', 'transparent');
    parentCell.empty();
    var s = '';
    for( var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        s += "<div style='margin: 1px;' class='marker marker" + index + '-' + value + "'>&nbsp;</div>";
    }
    parentCell.html(s);

    var showMarkerConflicts = $Options.getShowMarkerConflict();
    for( var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        var cell = $('.marker' + index + '-' + value);
        if(boardState.hasMarkerValue(value, index)) {
            cell.addClass(this.styles[value]);
            if(showMarkerConflicts && boardState.conflicts(value, index)) {
                cell.html("<div class='colorMarkerConflict'>&nbsp;</div>");
            }
        }
    }
};

/**
 */
ISOLACE.sudoku.ColorRenderer.prototype.renderPaused = function() {
    var pauseState = [1,2,2,0,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,0,0,1,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,2,0,0,1,1,1,0,0,2,2,2,0,0,4,0,0,2,2,2,2,2,0,0,0,2,2,2];
    for(var index = 0; index < 81; index++) {
        var cell = $('#c' + index);
        cell.css('background-image', '');
        cell.html('&nbsp;');
        var value = pauseState[index];
        if(value === 0) {
            cell.css('background-color', 'transparent');
        } else {
            cell.css('background-color', '#3B5998');
        }

        var s = "<div>&nbsp;</div>";
        cell.empty().append(s);
    }
};

/**
 */
ISOLACE.sudoku.ColorRenderer.prototype.renderCell = function(boardState, index) {
    var cell = $('#c' + index);
    cell.html('&nbsp;');
    var value = boardState.getValue(index);
    var isEditable = boardState.isEditable(index);
    var klass = 'color ' + this.styles[value] + ' ';
    cell.css('background-color', 'transparent');
    if(isEditable) {
        if(boardState.conflicts(value, index) && $Options.getShowGuessConflict()) {
            cell.css('background-color', 'red');
        }
    } else {
        klass += ' colorRevealed';
        if($.browser.msie) {
            klass += 'IE';
        }
    }

    var s = "<div class='" + klass + "'>&nbsp;</div>";
    cell.empty().append(s);
};
