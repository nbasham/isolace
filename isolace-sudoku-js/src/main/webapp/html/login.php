<?php
// Copyright 2007 Facebook Corp. ÊAll Rights Reserved. 
// 
// Application: Sudoku
// File: 'index.php' 
// Ê This is a sample skeleton for your application. 
// 

require_once 'facebook.php';

$appapikey = 'a5855f1a09bc33c67c2e16af718228e4';
$appsecret = '16c8f097f2e201048a04d7d48192a270';
$facebook = new Facebook($appapikey, $appsecret);
$user_id = $facebook->require_login();

// Greet the currently logged-in user!
echo "<p>Hello, <fb:name uid=\"$user_id\" useyou=\"false\" />!</p>";

// Print out at most 25 of the logged-in user's friends,
// using the friends.get API method
echo "<p>Friends:";
$friends = $facebook->api_client->friends_get();
$friends = array_slice($friends, 0, 25);
foreach ($friends as $friend) {
Ê echo "<br>$friend";
}
echo "</p>";