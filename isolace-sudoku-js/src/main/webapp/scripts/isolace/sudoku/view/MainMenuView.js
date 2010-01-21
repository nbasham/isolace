ISOLACE.namespace("sudoku");

/**
 * Handles main menu HTML UI.
 * @class MainMenuView
 * @namespace ISOLACE.sudoku
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.MainMenuView = function() {
    var me = this;
    $('#showBoardButton').bind('click', function() {
        $Events.fireShowBoard(me, $('#level').val());
    });
};

/**
 * @method getLevel
 */
ISOLACE.sudoku.MainMenuView.prototype.getLevel = function() {
    return $('#level').val();
};

/**
 * @method show
 */
ISOLACE.sudoku.MainMenuView.prototype.show = function() {
    $Log.debug("showing menu");
    $("#mainMenuView").dialog( {
        modal : false,
        resizable : false
    }).show();
    $('.ui-dialog-titlebar').hide();
};

/**
 * @method hideMenu
 */
ISOLACE.sudoku.MainMenuView.prototype.hide = function() {
    $('#mainMenuView').dialog('close');
};
