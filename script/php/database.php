<?php    
  function db_connect()
  {        
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'soptocuvco13';
    $conn = mysql_connect($dbhost, $dbuser, $dbpass);

    if(! $conn ) 
    {
        die('Could not connect: ' . mysql_error());
    }

    echo 'Connected successfully';
    return $conn;
  }



?>