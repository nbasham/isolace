ISOLACE.namespace("sudoku.ui.render");

/**
 * text supports Sudoku User Interface using text rendering.
 * 
 * @class text
 * @namespace ISOLACE.sudoku.ui.render
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see ISOLACE.sudoku.ui
 */
ISOLACE.sudoku.ui.render.text = function() {
};

/**
 * Get the symbol palette
 * 
 * @method getPalette
 * @return HTML of the symbol palette
 */
ISOLACE.sudoku.ui.render.text.prototype.getPalette = function(top, left) {
    var html = "<div class='palette' style='top: " + top + "; left: " + left + ";'>";
    for ( var i = 1; i <= 9; i++) {
        html += "<div class='symbol' onclick='javascript:$ui.guess(" + i + ")'>" + i + "</div>";
    }
    html += "</div>";

    return html;
};

/**
 * Get the hint palette
 * 
 * @method getHintPalette
 * @return HTML of the hint palette
 */
ISOLACE.sudoku.ui.render.text.prototype.getHintPalette = function(top, left) {
    var html = "<div class='hintPalette' style='top: " + top + "; left: " + left + ";'>";
    for ( var i = 1; i <= 9; i++) {
        html += "<div class='hintSymbol' onclick='javascript:$ui.hint(" + i + ")'>" + i + "</div>";
    }
    html += "</div>";

    return html;
};

/**
 * Set cell HTML of a revealed cell.
 * 
 * @param {int} Index of cell to be acted on.
 * @method updateRevealedCell
 */
ISOLACE.sudoku.ui.render.text.prototype.updateRevealedCell = function(index, value) {
    var selectedCell = $('#c' + index);
    selectedCell.addClass('revealedCell');
    selectedCell.text(value);
};

/**
 * Set cell HTML for a guess.
 * 
 * @param {int} Index of cell.
 * @param {int} Cell value.
 * @param {boolean} Does this value conflict.
 * @method updateGuessCell
 */
ISOLACE.sudoku.ui.render.text.prototype.updateGuessCell = function(index, value, conflicts) {
    var selectedCell = $('#c' + index);
    selectedCell.addClass('guessCell');
    selectedCell.removeClass('hintCell');
    if (value === 0) {
        selectedCell.text('');
    } else {
        if (conflicts) {
            selectedCell.removeClass('unrevealedCell');
            selectedCell.addClass('unrevealedCellConflicted');
        } else {
            selectedCell.removeClass('unrevealedCellConflicted');
            selectedCell.addClass('unrevealedCell');
        }
        selectedCell.text(value);
    }
};

/**
 * Set cell HTML for hints.
 * 
 * @param {int} Index of cell to be acted on.
 * @method updateHintCell
 */
ISOLACE.sudoku.ui.render.text.prototype.updateHintCell = function(index) {
    var selectedCell = $('#c' + index);
    selectedCell.removeClass('guessCell');
    selectedCell.addClass('hintCell');
    var s = '';
    for ( var i = 1; i <= 9; i++) {
        if ($ui.sudokuLogic.hasHint(index, i)) {
            if ($ui.sudokuLogic.conflicts(index, i)) {
                s += "<div class='hint unrevealedCellConflicted'>" + i + "</div>";
            } else {
                s += "<div class='hint unrevealedCell'>" + i + "</div>";
            }
        } else {
            s += "<div class='hint'>&nbsp;</div>";
        }
    }
    //window.console.log('Updating hint to: ' + s);
    selectedCell.html(s);
};

if (typeof $renderer === "undefined" || !$renderer) {
       /**
        * A singleton instance of ISOLACE.sudoku.ui.render.text automatically
        * created as a convenience so $renderer can be used instead of
        * ISOLACE.sudoku.ui.render.text.
        * @class ISOLACE.sudoku.ui.render.text
        * @static
        */
       var $renderer = new ISOLACE.sudoku.ui.render.text();
}
