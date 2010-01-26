/**
 * Render cells using images.
 * @class ImageRenderer
 * @namespace ISOLACE.sudoku.view.render
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
*/
ISOLACE.sudoku.ImageRenderer = function() {
    this.jcells = [];
    for(var i = 0; i < 81; i++) {
        var cell = $('#c' + i);
        this.jcells.push(cell);
    }
    $Events.handleStateChange(this, this.render);
};

/**
 * Render all cells based on boardState.
 * @method render
 * @param {BoardState} boardState The current state of the Sudoku board.
 */
ISOLACE.sudoku.ImageRenderer.prototype.render = function(boardState) {
    for(var i = 0; i < 81; i++) {
        var hasMarker = boardState.hasMarker(i);
        if(hasMarker) {
            this.renderMarkerCell(boardState, i);
        } else {
            this.renderCell(boardState, i);
        }
    }
    $Log.debug('Rendered: ' + boardState.state);
};

/**
 * @private
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderMarkerCell = function(boardState, index) {
    var parentCell = this.jcells[index];
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
 * @private
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderCell = function(boardState, index) {
    this.jcells[index].html('&nbsp;');
    var cell = this.jcells[index];
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

