ISOLACE.namespace("sudoku");

/**
 * Render cells using images.
 * @class ImageRenderer
 * @namespace ISOLACE.sudoku.view.render
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
*/
ISOLACE.sudoku.ImageRenderer = function() {
};

/**
 * Get the HTML to represent a symbol in the symbol count view.
 * @method renderCountSymbol
 * @param {int} symbolIndex The index of the symbol to render.
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderCountSymbol = function(symbolIndex) {
    var countSymbol = "<span style='width: 14px; float: left;' class='ui-icon ui-icon-stop'></span>";
    return countSymbol;
};

/**
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderMarkerCell = function(boardState, index) {
    var parentCell = $('#c' + index);
    this.setImage(parentCell, '');
    var s = '';
    for(var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        s += "<div class='marker marker" + index + '-' + value + "'>&nbsp;</div>";
    }
    parentCell.html(s);

    for(var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        var cell = $('.marker' + index + '-' + value);
        if(boardState.hasMarkerValue(value, index)) {
            if(boardState.conflicts(value, index)) {
                this.setImage(cell, value + '-marker-conflict');
            } else {
                this.setImage(cell, value + '-marker');
            }
        }
    }
};

/**
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderCell = function(boardState, index) {
    $('#c' + index).html('&nbsp;');
    var cell = $('#c' + index);
    var value = boardState.getValue(index);
    var isEditable = boardState.isEditable(index);
    if(isEditable) {
        if(boardState.conflicts(value, index)) {
            this.setImage(cell, value + '-guess-conflict');
        } else {
            this.setImage(cell, value + '-guess');
        }
    } else {
        this.setImage(cell, value + '-revealed');
    }
    if(value === 0) {        
        this.setImage(cell, '');
    }
};

/**
 * @private
 */
ISOLACE.sudoku.ImageRenderer.prototype.setImage = function(cell, imageName) {
    var imagePath = '../images/45/numbers/'  + imageName + '.png';
    cell.css('background-image', 'url(' + imagePath + ')');
    cell.css('background-repeat', 'no-repeat');
    cell.css('background-position', 'center center');
};

