module("isolace/sudoku/controller/TimerController");

asyncTest("Timer notify listener", function() {
    var timer = new ISOLACE.sudoku.TimerController();
    timer.start();
    $(document).one($Events.TIMER_INCREMENT(), function() {
        ok(true, "TimerController notified listener");
        timer.stop();
        start();
    });
});

asyncTest("Timer increments", function() {
    var timer = new ISOLACE.sudoku.TimerController();
    timer.start();
    var startTime = timer.getSeconds();
    setTimeout(function() {
        ok(startTime < timer.getSeconds(), "Timer increments");
        timer.stop();
        start();
    }, 2000);
});

asyncTest("Timer pauses", function() {
    var timer = new ISOLACE.sudoku.TimerController();
    timer.start();
    timer.pause();
    var startTime = timer.getSeconds();
    setTimeout(function() {
        equals(startTime, timer.getSeconds(), "Timer pauses");
        timer.stop();
        start();
    }, 2000);
});

asyncTest("Timer unpauses", function() {
    var timer = new ISOLACE.sudoku.TimerController();
    timer.start();
    timer.pause();
    timer.unpause();
    var startTime = timer.getSeconds();
    setTimeout(function() {
        ok(startTime < timer.getSeconds(), "Timer unpauses");
        timer.stop();
        start();
    }, 2000);
});
