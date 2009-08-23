ISOLACE.namespace("sudoku.ui.selection");

/**
 * Implements border selection for Sudoku User Interface.
 * 
 * @class border
 * @namespace ISOLACE.sudoku.ui.selection
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009 iRise. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @see ISOLACE.sudoku.ui
 */
ISOLACE.sudoku.ui.selection.border = function() {
    var jSelectionCell = undefined;
    
    this.setSelectionDiv = function(jSel) {
        $selectioner.jSelectionCell = jSel;
    };
    
    this.getSelectionDiv = function() {
        if(jSelectionCell === undefined) {
        }
        return $selectioner.jSelectionCell;
    };
};

/**
 * Remove selection decoration from cell.
 * 
 * @param {int} Index of cell to remove decoration from.
 * @method removeSelectionDecoration
 */
ISOLACE.sudoku.ui.selection.border.prototype.removeSelectionDecoration = function(cell, index) {
};

/**
 * Add selection decoration to cell.
 * 
 * @param {int} Index of cell to decorate.
 * @method addSelectionDecoration
 */
ISOLACE.sudoku.ui.selection.border.prototype.addSelectionDecoration = function(cell, index) {
    var t = cell.offset().top;
    var l = cell.offset().left;
    var sel = $selectioner.getSelectionDiv();
    if(sel === undefined) {
        //  cell.css('border-width') doesn't return a value, can I dynamically get border width?
        var h = parseInt(cell.css('height')) - 4;
        var w = parseInt(cell.css('width')) - 4;
        var s = 'position: absolute; color: transparent; top: ' + t + '; left: ' + l + '; width: ' + w + '; height: ' + h;
        var html = "<div class='selectedCell' style='" + s + "'>&nbsp;</div>";
        $('#someDiv').append(html);
        sel = $('.selectedCell');
        $selectioner.setSelectionDiv(sel);
    } else {
        sel.css('top', t);
        sel.css('left', l);
    }
    sel.css('display', 'block');
};

if (typeof $selectioner === "undefined" || !$selectioner) {
       /**
        * A singleton instance of ISOLACE.sudoku.ui.selection.border automatically
        * created as a convenience so $selectioner can be used instead of
        * ISOLACE.sudoku.ui.selection.border.
        * @class ISOLACE.sudoku.ui.selection.border
        * @static
        */
       var $selectioner = new ISOLACE.sudoku.ui.selection.border();
}
