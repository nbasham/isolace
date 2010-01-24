ISOLACE.namespace("sudoku");

/**
 * GameController handles game flow.
 * @class GameController
 * @namespace ISOLACE.sudoku.controller
 * @constructor
 * @author Norman Basham, iSolace, Copyright (c) 2009-2010. ALL RIGHTS RESERVED<br/>
 * @version 0.1
 */
ISOLACE.sudoku.GameController = function() {
    var options = {};
    this.mainMenuView = new ISOLACE.sudoku.MainMenuView();
    this.boardManager = new ISOLACE.sudoku.BoardManager(options);
    $Events.handleShowMainMenu(this, this.showMainMenu);
    $Events.handleShowBoard(this, this.showBoard);
    this.showBoard();
};

/**
 * Show the main menu.
 * @method showMenu
 */
ISOLACE.sudoku.GameController.prototype.showMainMenu = function() {
    this.mainMenuView.show();
};

/**
 * Hide the main menu.
 * @method hideMenu
 */
ISOLACE.sudoku.GameController.prototype.hideMainMenu = function() {
    this.mainMenuView.hide();
};

/**
 * Show the main menu.
 * @method showMenu
 */
ISOLACE.sudoku.GameController.prototype.showBoard = function() {
    this.hideMainMenu();
    this.options = {};
    this.boardManager.show(this.options);
};

/**
 * Hide the main menu.
 * @method hideMenu
 */
ISOLACE.sudoku.GameController.prototype.hideBoard = function() {
    this.boardManager.hide();
};
