<?php
// Replace profanity with asterisks
// 3 letter words
$asterisks = "***";
$message = str_ireplace("ass",$asterisks,$message);

// 4 letter words
$asterisks .= "*";
$message = str_ireplace("dick",$asterisks,$message);
$message = str_ireplace("cunt",$asterisks,$message);
$message = str_ireplace("fcuk",$asterisks,$message);
$message = str_ireplace("fuck",$asterisks,$message);
$message = str_ireplace("shit",$asterisks,$message);
$message = str_ireplace("slut",$asterisks,$message);
$message = str_ireplace("twat",$asterisks,$message);

// 5 letter words
$asterisks .= "*";
$message = str_ireplace("bitch",$asterisks,$message);
$message = str_ireplace("choad",$asterisks,$message);
$message = str_ireplace("nigga",$asterisks,$message);
$message = str_ireplace("pussy",$asterisks,$message);

// 6 letter words
$asterisks .= "*";
$message = str_ireplace("bugger",$asterisks,$message);
$message = str_ireplace("nigger",$asterisks,$message);
$message = str_ireplace("wanker",$asterisks,$message);

// 7 letter words
$asterisks .= "*";
$message = str_ireplace("bastard",$asterisks,$message);

// 8 letter words
$asterisks .= "*";
$message = str_ireplace("bollocks",$asterisks,$message);

// 9 letter words
$asterisks .= "*";

// 10 letter words
$asterisks .= "*";

// 11 letter words
$asterisks .= "*";

// 12 letters
$asterisks .= "*";
$message = str_ireplace("motherfucker",$asterisks,$message);
?>