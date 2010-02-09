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
    parentCell.css('background-image', "url('')");
    var s = '';
    for(var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        s += "<div class='marker marker" + index + '-' + value + "'>&nbsp;</div>";
    }
    parentCell.html(s);

    var showMarkerConflicts = $Persistence.getShowMarkerConflict();
    for(var markerIndex = 0; markerIndex < 9; markerIndex++) {
        var value = markerIndex + 1;
        var cell = $('.marker' + index + '-' + value);
        if(boardState.hasMarkerValue(value, index)) {
            if(showMarkerConflicts && boardState.conflicts(value, index)) {
                this.setBackground(cell, value + '-marker-conflict');
            } else {
                this.setBackground(cell, value + '-marker');
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
        if(value === 0) {
            cell.css('background-image', "url('')");
        } else if(boardState.conflicts(value, index) && $Persistence.getShowGuessConflict()) {
            this.setBackground(cell, value + '-guess-conflict');
        } else {
            this.setBackground(cell, value + '-guess');
        }
    } else {
        this.setBackground(cell, value + '-revealed');
    }
};


/**
 * @method renderTimer
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderTimer = function(seconds) {
    var time = $SUDOKU_UTIL.formatTime(seconds);
    var timeElements = time.split('');
    var numPlaces = timeElements.length;
    if(numPlaces > 5) {
        $('#timerImage5').show();
    } else {
        $('#timerImage5').hide();
    }
    for( var i = 0; i < numPlaces; i++) {
        var el = timeElements[numPlaces - i - 1];
        if(el != ':') {
            this.setBackground($('#timerImage' + i), 'timer-' + el);
        }
    }
};

/**
 * @private
 */
ISOLACE.sudoku.ImageRenderer.prototype.setBackground = function(cell, imageName) {
    var imagePath = '../images/' + ISOLACE.sudoku.THEME + '/combined.png';
    cell.css('background-image', 'url(' + imagePath + ')');
    cell.css('background-repeat', 'no-repeat');
    cell.removeClassContains('sprite');
    cell.addClass('sprite-' + imageName);
};

/**
 * @method renderSelector
 */
ISOLACE.sudoku.ImageRenderer.prototype.renderSelector = function(index, inMarkerMode) {
    if(this.selector === undefined) {
        this.selector = $('<div/>', {
            id: 'selector',
            'class': 'guessBackground'
        }).appendTo('.board');
        this.setBackground(this.selector, 'select');
        this.marker = $('<div/>', {
            id: 'selectorMarker',
            'class': 'ui-icon ui-icon-pencil fiftyPercent',
            css: {
                'background-color': '#3B5998'
            }
        }).appendTo('.board').hide();
    }
//    if(index === undefined) {
//        this.selector.hide();
//        return;
//    } else {
//        this.selector.show();
//    }
    var cell = $('#c' + index);
    var t = cell.position().top;
    var l = cell.position().left;
    this.selector.css('top', t);
    this.selector.css('left', l);
    this.selector.css('display', 'block');

    if(inMarkerMode) {
        //this.selector.removeClass('guessBackground');
        //this.selector.addClass('markBackground');
        //this.marker.addClass('markBackground');
        this.marker.css('display', 'block');
    } else {
        //this.selector.removeClass('markBackground');
        //this.selector.addClass('guessBackground');
        this.marker.css('display', 'none');
    }
    this.marker.css('top', t);
    this.marker.css('left', l);
    $Log.debug('Rendered selector at index ' + index + '.');
};
