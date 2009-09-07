package com.isolace.sudoku;

import java.text.SimpleDateFormat;

import com.isolace.common.Time;
import com.isolace.sudoku.server.Puzzle;

/**
 * Score is a simple POJO to satisfy GUI.
 */
public class Score {

    private static final SimpleDateFormat formatter = new SimpleDateFormat("EEE, MMM d, yyyy");
    private String time;
    private String date;
    private String level;
    private String user;

    public Score(GameRecord game) {
        this.date = formatter.format(game.getDate());
        this.time = Time.millisToSecondsToTimeStr(game.getElapsedTime() * 1000);
        switch (game.getPuzzleLevel()) {
            case Puzzle.EASY_LEVEL:
                this.level = "Easy";
                break;
            case Puzzle.MEDIUM_LEVEL:
                this.level = "Medium";
                break;
            case Puzzle.HARD_LEVEL:
                this.level = "Hard";
                break;
            default:
                this.level = "Challenger";
                break;
        }
        this.level += " - " + game.getPuzzleIndex();
        this.user = game.getUser().getNickname();
        if(this.user.indexOf("@") != -1) {
            this.user = this.user.substring(0, this.user.indexOf("@"));
        }
    }

    public String getTime() {
        return time;
    }

    public String getDate() {
        return date;
    }

    public String getLevel() {
        return level;
    }

    public String getUser() {
        return user;
    }

    @Override
    public String toString() {
        return this.level + " was completed on " + this.date + " by " + this.user + " time: " + this.time + ".";
    }

}
