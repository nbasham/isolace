module("isolace/timer/TimerView", {
    setup: function() {
        jQuery('<div/>', {
            id: 'timerView'
        }).appendTo('body');
        this.tv = new ISOLACE.TimerView();
    },
    teardown: function() {
        $('#timerView').remove();
        $TimerEvent.unbind();
    }
});

test("TimerView", function() {
    ok(this.tv, "TimerView instantiated");
});

module("isolace/timer/TimerEvent", {
  setup: function() {
  },
  teardown: function() {
      $TimerEvent.unbind();
  }
});

test("$TimerEvent", function() {
    ok($TimerEvent, "$TimerEvent defined");
});

asyncTest("TimerIncrement", function() {
    expect(1);
    $TimerEvent.handleTimerIncrement(this, function(seconds) {
        equals(seconds, 37, "TimerIncrement fired and handled");
        start();
    });
    $TimerEvent.fireTimerIncrement(37);
});

asyncTest("TimerPause", function() {
    expect(1);
    $TimerEvent.handleTimerPause(this, function() {
        ok(true, "TimerPause fired and handled");
        start();
    });
    $TimerEvent.fireTimerPause();
});

asyncTest("TimerStart", function() {
    expect(1);
    $TimerEvent.handleTimerStart(this, function() {
        ok(true, "TimerStart fired and handled");
        start();
    });
    $TimerEvent.fireTimerStart(true, false);
});

asyncTest("TimerStop", function() {
    expect(1);
    $TimerEvent.handleTimerStop(this, function() {
        ok(true, "TimerStop fired and handled");
        start();
    });
    $TimerEvent.fireTimerStop();
});

asyncTest("TimerUnpause", function() {
    expect(1);
    $TimerEvent.handleTimerUnpause(this, function() {
        ok(true, "TimerUnpause fired and handled");
        start();
    });
    $TimerEvent.fireTimerUnpause();
});

module("isolace/timer/TimerController", {
  setup: function() {
    this.tc = new ISOLACE.TimerController();
    this.tc.start();
    this.tc.unpause();
    this.startTime = this.tc.getSeconds();
  },
  teardown: function() {
      this.tc.stop();
      $TimerEvent.unbind();
  }
});

test('constructor', function() {
    ok(this.tc, "instantiated");
});

asyncTest("TimerIncrement", function() {
    expect(1);
    $TimerEvent.handleTimerIncrement(this, function(seconds) {
        ok(seconds != this.startTime, "TimerIncrement fired and handled");
        start();
    });
});

asyncTest("Timer pauses", function() {
    expect(1);
    this.tc.pause();
    var currTime = this.tc.getSeconds();
    var me = this;
    setTimeout(function() {
        equals(currTime, me.tc.getSeconds(), "Timer pauses");
        start();
    }, 1100);
    stop();
});

asyncTest("Timer unpauses", function() {
    expect(1);
    this.tc.pause();
    this.tc.unpause();
    var me = this;
    setTimeout(function() {
        ok(me.startTime < me.tc.getSeconds(), "Timer unpauses");
        start();
    }, 2000);
    stop();
});