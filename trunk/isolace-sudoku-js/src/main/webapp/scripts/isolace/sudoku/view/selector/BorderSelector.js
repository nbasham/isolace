ISOLACE.namespace("sudoku");

/**
 * Implements selecting a cell using a border.
 * 
 * @class BorderSelector
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */

ISOLACE.sudoku.BorderSelector = function() {
    this.div = undefined;
};

/**
 * Represents a cell being selected by adding a border.
 * 
 * @method select
 */
ISOLACE.sudoku.BorderSelector.prototype.select = function(index) {
    var cell = $('#c' + index);
    var t = cell.offset().top;
    var l = cell.offset().left;
    if(this.div === undefined) {
        //  cell.css('border-width') doesn't return a value, can I dynamically get border width?
        var h = parseInt(cell.css('height')) - 4;
        var w = parseInt(cell.css('width')) - 4;
        var s = 'position: absolute; color: transparent; top: ' + t + '; left: ' + l + '; width: ' + w + 'px; height: ' + h + 'px;';
        var html = "<div class='selectedCell' style='" + s + "'>&nbsp;</div>";
        $('#boardView').append(html);
        this.div = $('.selectedCell');
    }
    this.div.css('top', t);
    this.div.css('left', l);
    this.div.css('display', 'block');
};

/**
 * Not required because select moves the border from the previously selected cell.
 * 
 * @method unselect
 */
ISOLACE.sudoku.BorderSelector.prototype.unselect = function(cell, index) {
};

