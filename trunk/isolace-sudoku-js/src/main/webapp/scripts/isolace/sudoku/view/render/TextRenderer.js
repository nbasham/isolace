ISOLACE.namespace("sudoku");

/**
 * A renderer that updates renders text for each Sudoku board cell.
 * 
 * @namespace ISOLACE.sudoku.view.render
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @class TextRenderer
 */
ISOLACE.sudoku.TextRenderer = function() {
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
ISOLACE.sudoku.TextRenderer.prototype.render = function(boardState) {
    for(var i = 0; i < 81; i++) {
//        var jCell = this.jcells[i];
//        this.jcells[i].html(boardState.state[i]);
        var hasMarker = boardState.hasMarker(i);
        if(hasMarker) {
            this.renderMarkerCell(boardState, i);
        } else {
            this.renderCell(boardState, i);
        }
    }
};

/**
 * @private
 */
ISOLACE.sudoku.TextRenderer.prototype.renderMarkerCell = function(boardState, index) {
    var s = '';
    for(var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        if(boardState.hasMarkerValue(value, index)) {
            if(boardState.conflicts(value, index)) {
                s += "<div class='marker unrevealedCellConflicted'>" + value + "</div>";
            } else {
                s += "<div class='marker unrevealedCell'>" + value + "</div>";
            }
        } else {
            s += "<div class='marker'>&nbsp;</div>";
        }
    }
    this.jcells[index].html(s);
};

/**
 * @private
 */
ISOLACE.sudoku.TextRenderer.prototype.renderCell = function(boardState, index) {
    var jCell = this.jcells[index];
    var value = boardState.getValue(index);
    var isEditable = boardState.isEditable(index);
    if(isEditable) {
        jCell.addClass('unrevealedCell');
        if(boardState.conflicts(value, index)) {
            jCell.addClass('unrevealedCellConflicted');
        } else {
            jCell.removeClass('unrevealedCellConflicted');
        }
    } else {
        jCell.addClass('revealedCell');
    }
    if(value === 0) {
        value = '';
    }
    jCell.html(value);
};

