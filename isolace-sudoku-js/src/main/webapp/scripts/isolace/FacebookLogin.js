// initialize the library with the API key
FB.init( {
    apiKey : 'a5855f1a09bc33c67c2e16af718228e4'
});

// fetch the status on load
FB.getLoginStatus(handleSessionResponse);

$('#login').bind('click', function() {
    FB.login(handleSessionResponse);
});

$('#logout').bind('click', function() {
    FB.logout(handleSessionResponse);
});

$('#disconnect').bind('click', function() {
    FB.api( {
        method : 'Auth.revokeAuthorization'
    }, function(response) {
        clearDisplay();
    });
});

// no user, clear display
function clearDisplay() {
    $('#user-info').hide('fast');
}

// handle a session response from any of the auth related calls
function handleSessionResponse(response) {
    // if we dont have a session, just hide the user info
    if(!response.session) {
        clearDisplay();
        return;
    }

    // if we have a session, query for the user's profile picture and name
    FB.api( {
        method : 'fql.query',
        query : 'SELECT name, pic FROM profile WHERE id=' + FB.getSession().uid
    }, function(response) {
        var user = response[0];
        $('#user-info').html('<img src="' + user.pic + '">' + user.name).show('fast');
    });
}