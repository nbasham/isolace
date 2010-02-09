/**
 * Create a Dialog object.
 * @class Handles Sudoku dialogs.
 * @namespace ISOLACE
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.Dialog = function() {
    this.skipDialog = undefined;
    this.skipGameConfig = {
            bgiframe: true,
            resizable: false,
            height:140,
            modal: true,
            overlay: {
                backgroundColor: '#3B5998',
                opacity: 0.5
            },
            buttons: {
                'New Game': function() {
                    //  close first
                    $(this).dialog('close');
                    $GameEvent.fireSkipGame();
                },
                Cancel: function() {
                    $(this).dialog('close');
                }
            }
    };
    this.solvedDialog = undefined;
    this.solvedConfig = {
            modal : true,
            buttons : {
                "Ok" : function() {
                    $(this).dialog("close");
                    $('#tabs').tabs('select', 3);
//                    location.reload();
            }
        }
    };
};

ISOLACE.Dialog.prototype.showSkipGameDialog = function() {
    if(this.skipDialog === undefined) {
        this.skipDialog = $("#skipGameView").dialog(this.skipGameConfig);
    }
    this.skipDialog.dialog('open');
};

ISOLACE.Dialog.prototype.showSolvedDialog = function(html) {
    if(this.solvedDialog === undefined) {
        this.solvedDialog = $("#solvedView").dialog(this.solvedConfig);
    }
    this.solvedDialog.html(html);
    this.solvedDialog.dialog('open');
};

if(typeof $Dialog == "undefined" || !$Dialog) {
    /**
     * A singleton instance of ISOLACE.Dialog providing global access.
     * @class ISOLACE.Dialog
     * @static
     */
    var $Dialog = new ISOLACE.Dialog();
}