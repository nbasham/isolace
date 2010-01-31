/**
 * Constructs an PanelController object.
 * @class PanelController handles the loading, showing and hiding of panels (e.g. game, score, help, etc.).
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 * @constructor
 * @param {options} options The Sudoku options.
 */
ISOLACE.PanelController = function(options) {
    this.options = options;
    this.currentPanel = 0;
    
    this.panelControllers = [];
    var panel;
//    var panel = new ISOLACE.AboutPanel();
    this.panelControllers.push(null);

    panel = new ISOLACE.GamePanel(options);
    this.panelControllers.push(panel);
    
//    panel = new ISOLACE.OptionPanel();
    this.panelControllers.push(null);
    
    panel = new ISOLACE.ScorePanel(options);
    this.panelControllers.push(panel);
    
    this.load(this.options);
    var me = this;
    $('#tabs').bind('tabsselect', function(event, ui) {
        me.changePanel(ui.index);
        // Objects available in the function context:
        // ui.tab     // anchor element of the selected (clicked) tab
        // ui.panel   // element, that contains the selected/clicked tab contents
        // ui.index   // zero-based index of the selected (clicked) tab

    });
};

ISOLACE.PanelController.prototype.ABOUT_PANEL = 0;
ISOLACE.PanelController.prototype.GAME_PANEL = 1;
ISOLACE.PanelController.prototype.OPTIONS_PANEL = 2;
ISOLACE.PanelController.prototype.SCORE_PANEL = 3;

/**
 * Load each panel, if it defined a load function.
 * @method load
 * @private
 * @param {options} options The Sudoku options.
 */
ISOLACE.PanelController.prototype.load = function(options) {
    $Log.debug('Loading panels');
    for( var panelIndex = 0; panelIndex < this.panelControllers.length; panelIndex++) {
        var panelContext = this.panelControllers[panelIndex];
        if(panelContext !== null && panelContext.load) {
            panelContext.load.call(panelContext, options);
        }
    }
};

/**
 * Get the amount to access for each incorrect guess.
 * @method changePanel
 * @private
 * @param {number} panelIndexToShow The index of the panel about to show.
 */
ISOLACE.PanelController.prototype.changePanel = function(panelIndexToShow) {
    $Log.debug('Changing current panel to ' + panelIndexToShow);
    for( var panelIndex = 0; panelIndex < this.panelControllers.length; panelIndex++) {
        var panelContext = this.panelControllers[panelIndex];
        if(panelContext !== null) {
            if(panelIndexToShow == panelIndex) {
                if(panelContext.show) {
                    panelContext.show.call(panelContext, this.options);
                }
            } else {
                if(panelContext.hide) {
                    panelContext.hide.call(panelContext, this.options);
                }
            }
        }
    }
};
