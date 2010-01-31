/**
 * Creates a ImageSetRenderer object.
 * @class ImageSetRenderer takes a set of 10 images to render as revealed, guess
 *        and marker symbols.
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.ImageSetRenderer = function() {
    this.jcells = [];
    for( var i = 0; i < 81; i++) {
        var cell = $('#c' + i);
        this.jcells.push(cell);
    }
    $GameEvent.handleStateChange(this, this.render);
};

/**
 * Render all cells based on boardState.
 * @method render
 * @param {BoardState} boardState The current state of the Sudoku board.
 */
ISOLACE.sudoku.ImageSetRenderer.prototype.render = function(boardState) {
    for( var i = 0; i < 81; i++) {
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
ISOLACE.sudoku.ImageSetRenderer.prototype.renderMarkerCell = function(boardState, index) {
    var parentCell = this.jcells[index];
    this.setImage(parentCell, '');
    var s = '';
    for( var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        s += "<div class='marker marker" + index + '-' + value + "'>&nbsp;</div>";
    }
    parentCell.html(s);

    for( var markerIndex = 0; markerIndex < 9; markerIndex++) {
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
ISOLACE.sudoku.ImageSetRenderer.prototype.renderCell = function(boardState, index) {
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
ISOLACE.sudoku.ImageSetRenderer.prototype.setImage = function(cell, index, isMarker) {
    var imagePath = '../images/45/football/' + index + '.jpg';
    if(isMarker) {
        cell.css('background-size', '15px');
    } else {
        cell.css('background-size', '100%');
    }
    cell.css('background-image', 'url(' + imagePath + ')');
    cell.css('background-repeat', 'no-repeat');
    cell.css('background-position', 'center center');
};
