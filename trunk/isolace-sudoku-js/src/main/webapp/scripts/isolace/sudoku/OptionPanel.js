/**
 * Create a OptionPanel object.
 * @class Handles player option selection.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.OptionPanel = function() {
    $GameEvent.handleLevelChange(this, this.handleLevelChange);
};

/**
 * Initialize the panel.
 * @method load
 */
ISOLACE.OptionPanel.prototype.load = function() {
};

/**
 * Show the panel.
 * @method show
 */
ISOLACE.OptionPanel.prototype.show = function() {
    this.setPuzzleLevelButtonState();
};

/**
 * Hide the panel.
 * @method hide
 */
ISOLACE.OptionPanel.prototype.hide = function() {
};


/**
 * @method handleLevelChange
 * @private
 */
ISOLACE.OptionPanel.prototype.handleLevelChange = function(level) {
    this.setPuzzleLevelButtonState();
};

/**
 * Set initial puzzle level button state.
 * @method setPuzzleLevelButtonState
 * @private
 */
ISOLACE.OptionPanel.prototype.setPuzzleLevelButtonState = function() {
    $('#level0Button').removeClass('ui-state-active');
    $('#level1Button').removeClass('ui-state-active');
    $('#level2Button').removeClass('ui-state-active');
    $('#level3Button').removeClass('ui-state-active');
    var level = $Persistence.getPuzzleLevel();
    $('#level' + level + 'Button').addClass('ui-state-active');
};
