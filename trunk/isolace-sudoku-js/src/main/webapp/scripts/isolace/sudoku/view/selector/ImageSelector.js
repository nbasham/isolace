ISOLACE.namespace("sudoku");

/**
 * Implements selecting a cell using a image.
 * 
 * @class ImageSelector
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */

ISOLACE.sudoku.ImageSelector = function() {
    this.selector = undefined;
};

/**
 * Represents a cell being selected by adding a image.
 * 
 * @method select
 */
ISOLACE.sudoku.ImageSelector.prototype.select = function(index) {
    if(this.selector === undefined) {
        this.createSelectorElement();
    }
    var cell = $('#c' + index);
    var t = cell.offset().top;
    var l = cell.offset().left;
    this.selector.css('top', t);
    this.selector.css('left', l);
    this.selector.css('display', 'block');
};

/**
 * Not required because select moves the image from the previously selected cell.
 * 
 * @method unselect
 */
ISOLACE.sudoku.ImageSelector.prototype.unselect = function(cell, index) {
};


/**
 * Create selector HTMLELement.
 * @private
 * @method createSelectorElement
 */
ISOLACE.sudoku.ImageSelector.prototype.createSelectorElement = function() {
    this.selector = $('<img/>', {
        src: '../images/select.png',
        css: {
            position: "absolute",
            height: "64px",
            width: "64px"
        }
    }).appendTo("#boardView");
};

