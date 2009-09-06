package com.isolace.sudoku;

import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.users.User;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class GameRecord {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;
    @Persistent
    private int puzzleLevel;
    @Persistent
    private User user;
    @Persistent
    private int puzzleIndex;
    @Persistent
    private Long elapsedTime;
    @Persistent 
    private Date date;

    public GameRecord(User user, int puzzleLevel, int puzzleIndex, Long elapsedTime, Date date) {
        super();
        this.user = user;
        this.puzzleLevel = puzzleLevel;
        this.puzzleIndex = puzzleIndex;
        this.elapsedTime = elapsedTime;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public int getPuzzleLevel() {
        return puzzleLevel;
    }

    public int getPuzzleIndex() {
        return puzzleIndex;
    }

    public Long getElapsedTime() {
        return elapsedTime;
    }

    public Date getDate() {
        return date;
    }

    public void setPuzzleLevel(int puzzleLevel) {
        this.puzzleLevel = puzzleLevel;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPuzzleIndex(int puzzleIndex) {
        this.puzzleIndex = puzzleIndex;
    }

    public void setElapsedTime(Long elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "GameRecord " + id + " for user " + user + " puzzle level " + puzzleLevel + " index " + puzzleIndex + " time " + elapsedTime + " played on " + date;
    }
    
    
}
