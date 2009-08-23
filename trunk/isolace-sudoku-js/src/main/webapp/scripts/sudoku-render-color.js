ISOLACE.namespace("sudoku.ui.render");

/**
 * color supports Sudoku User Interface using color rendering.
 * 
 * @class color
 * @namespace ISOLACE.sudoku.ui.render
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see ISOLACE.sudoku.ui
 */
ISOLACE.sudoku.ui.render.color = function() {
    this.styles = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
};

/**
 * Gets the symbol palette
 * 
 * @method getPalette
 * @return HTML of the symbol palette
 */
ISOLACE.sudoku.ui.render.color.prototype.getPalette = function(top, left) {
    var html = "<div class='palette' style='top: " + top + "; left: " + left + ";'>";
    for ( var i = 1; i <= 9; i++) {
        html += "<div class='symbol " + $renderer.styles[i] + "' onclick='javascript:$ui.guess(" + i + ")'>" + i + "</div>";
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
ISOLACE.sudoku.ui.render.color.prototype.getHintPalette = function(top, left) {
    var html = "<div class='hintPalette' style='top: " + top + "; left: " + left + ";'>";
    for ( var i = 1; i <= 9; i++) {
        html += "<div class='hintSymbol " + $renderer.styles[i] + "' onclick='javascript:$ui.hint(" + i + ")'>" + i + "</div>";
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
ISOLACE.sudoku.ui.render.color.prototype.updateRevealedCell = function(index, value) {
    var selectedCell = $('#c' + index);
    var html = "<div class='" + $renderer.styles[value] + " revealed'>&nbsp;</div>";
    selectedCell.empty().html(html);
};

/**
 * Set cell HTML for a guess.
 * 
 * @param {int} Index of cell.
 * @param {int} Cell value.
 * @param {boolean} Does this value conflict.
 * @method updateGuessCell
 */
ISOLACE.sudoku.ui.render.color.prototype.updateGuessCell = function(index, value, conflicts) {
    var selectedCell = $('#c' + index);
    var c = 'guess ' + $renderer.styles[value];
    var html = "<div class='" + c + "'>&nbsp;</div>";
    if(conflicts) {
        selectedCell.addClass('conflict');
    } else {
        selectedCell.removeClass('conflict');
    }
    selectedCell.empty().append(html);
};

/**
 * Set cell HTML for hints.
 * 
 * @param {int} Index of cell to be acted on.
 * @method updateHintCell
 */
ISOLACE.sudoku.ui.render.color.prototype.updateHintCell = function(index) {
    var selectedCell = $('#c' + index);
    selectedCell.removeClass('conflict');
    var c = 'hint ';// + $renderer.styles[value];
    var s = '';
    for ( var i = 1; i <= 9; i++) {
        if ($ui.sudokuLogic.hasHint(index, i)) {
            if ($ui.sudokuLogic.conflicts(index, i)) {
                s += "<div class='" + c + $renderer.styles[i] + "'>X&nbsp;</div>";
            } else {
                s += "<div class='" + c + $renderer.styles[i] + "'>&nbsp;</div>";
            }
        } else {
            s += "<div class='" + c + $renderer.styles[0] + "'>&nbsp;</div>";
        }

    }
    //window.console.log('Updating hint to: ' + s);
   // alert('setting cell ' + index + ' to ' + s)
    selectedCell.empty().append(s);
};

if (typeof $renderer === "undefined" || !$renderer) {
       /**
        * A singleton instance of ISOLACE.sudoku.ui.render.color automatically
        * created as a convenience so $renderer can be used instead of
        * ISOLACE.sudoku.ui.render.color.
        * @class ISOLACE.sudoku.ui.render.color
        * @static
        */
       var $renderer = new ISOLACE.sudoku.ui.render.color();
}
