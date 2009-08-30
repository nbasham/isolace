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
    private final int puzzleLevel;
    @Persistent
    private final User user;
    @Persistent
    private final int puzzleIndex;
    @Persistent
    private final Long elapsedTime;
    @Persistent
    private final Date date;

    public GameRecord(User user, int puzzleLevel, int puzzleIndex, Long elapsedTime, Date date) {
        super();
        this.user = user;
        this.puzzleLevel = puzzleLevel;
        this.puzzleIndex = puzzleIndex;
        this.elapsedTime = elapsedTime;
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return id;
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
}
