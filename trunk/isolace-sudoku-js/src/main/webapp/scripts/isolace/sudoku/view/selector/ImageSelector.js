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
    this.markMode = false;
    $GameEvent.handleToggleMarkMode(this, this.handleToggleMarkMode);
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
    var l = cell.position().left;
    this.selector.css('top', t);
    this.selector.css('left', l);
    this.selector.css('display', 'block');

    this.marker.css('top', t + 16);
    this.marker.css('left', l + 16);
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
        src: '../images/45/numbers/select.png',
        id: 'selector'
    }).appendTo('.board');
    this.marker = $('<div/>', {
        id: 'selectorMarker',
        'class': 'ui-icon ui-icon-pencil fiftyPercent'
    }).appendTo('.board').hide();
};

/**
 * Handle a toggle mark mode event.
 * 
 * @method handleToggleMarkMode
 */
ISOLACE.sudoku.ImageSelector.prototype.handleToggleMarkMode = function() {
    this.markMode = !this.markMode;
    if(this.markMode) {
        this.marker.css('display', 'block');
    } else {
        this.marker.css('display', 'none');
    }
};