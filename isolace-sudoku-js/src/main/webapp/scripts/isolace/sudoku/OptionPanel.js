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
    var showTimer = $Persistence.getShowTimer();
    $('#showTimerControl')[0].checked = showTimer;
    $('#showTimerControl').click(function() {
        var showTimer = $('#showTimerControl')[0].checked;
        $Persistence.setShowTimer(showTimer);
        //$GameEvent.fireShowTimer(showTimer);
    });
    this.showMarkerConflict = $Persistence.getShowMarkerConflict();
    $('#showMarkConflictControl')[0].checked = this.showMarkerConflict;
    $('#showMarkConflictControl').click(function() {
        var showMarkConflict = $('#showMarkConflictControl')[0].checked;
        $Persistence.setShowMarkerConflict(showMarkConflict);
        $GameEvent.fireShowMarkerConflict(showMarkConflict);
    });
    this.showGuessConflict = $Persistence.getShowGuessConflict();
    $('#showGuessConflictControl')[0].checked = this.showGuessConflict;
    $('#showGuessConflictControl').click(function() {
        var showGuessConflict = $('#showGuessConflictControl')[0].checked;
        $Persistence.setShowGuessConflict(showGuessConflict);
        //$GameEvent.fireShowGuessConflict(showGuessConflict);
    });

    this.useColorSymbols = $Persistence.getUseColorSymbols();
    $('#useColorSymbolControl')[0].checked = this.useColorSymbols;
    $('#useColorSymbolControl').click(function() {
        var useColorSymbols = $('#useColorSymbolControl')[0].checked;
        $Persistence.setUseColorSymbols(useColorSymbols);
        //$GameEvent.fireUseColorSymbols(useColorSymbols);
    });
    
    this.setPuzzleLevelButtonState();
    $('#level0Button').click(function() {
        $Persistence.setPuzzleLevel(0);
    });
    $('#level1Button').click(function() {
        $Persistence.setPuzzleLevel(1);
    });
    $('#level2Button').click(function() {
        $Persistence.setPuzzleLevel(2);
    });
    $('#level3Button').click(function() {
        $Persistence.setPuzzleLevel(3);
    });
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
