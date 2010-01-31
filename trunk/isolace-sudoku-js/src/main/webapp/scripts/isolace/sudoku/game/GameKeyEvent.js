//  Isolate key event handling so that it can be swapped out in non keyboard environments (e.g. iPhone).

$(document).ready(function() {
    $('body').keyup(function(event) {
        var keyCode = event.keyCode;
        if(keyCode == 77) { //  m
            $GameEvent.fireToggleMarkMode();
        }

    });
});
