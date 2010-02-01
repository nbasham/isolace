/**
 * Constructs an Options object.
 * @class Maintains player options. TODO Persist values.
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 */
ISOLACE.Options = function() {

    this.symbolType = 'numeric';
};

/**
 * Get the symbol type, currently this can be numeric or color.
 * @method getSymbolType
 * @return 'color' or 'numeric'.
 * @type {string}
 */
ISOLACE.Options.prototype.getSymbolType = function() {
    return this.symbolType;
};

/**
 * Set the symbol type, currently this can be numeric or color.
 * @method setSymbolType
 * @param {string} symbolType 'color' to use color symbols else numeric symbols
 *            will be rendered.
 */
ISOLACE.Options.prototype.setSymbolType = function(symbolType) {
    this.symbolType = 'numeric';
    if(symbolType == 'color') {
        this.symbolType = 'color';
    }
};

/**
 * Set the symbol type, currently this can be numeric or color.
 * @method setSymbolType
 * @param {string} symbolType 'color' to use color symbols else numeric symbols
 *            will be rendered.
 */
ISOLACE.Options.prototype.handleSymbolTypeUpdate = function(symbolType) {
    this.setSymbolType(symbolType);
    if(symbolType == 'color') {
        $('#numericBoardImage').removeClass('optionsSymbolTypeImageSelected');
        $('#colorBoardImage').addClass('optionsSymbolTypeImageSelected');
        $('#numericBoardButton').removeClass('ui-state-active');
        $('#colorBoardButton').addClass('ui-state-active');
        
    } else {
        $('#numericBoardImage').addClass('optionsSymbolTypeImageSelected');
        $('#colorBoardImage').removeClass('optionsSymbolTypeImageSelected');
        $('#numericBoardButton').addClass('ui-state-active');
        $('#colorBoardButton').removeClass('ui-state-active');
    }
};

if(typeof $Options == "undefined" || !$Options) {
    /**
     * Global player options.
     * @class ISOLACE.Options
     * @static
     */
    var $Options = new ISOLACE.Options();
}