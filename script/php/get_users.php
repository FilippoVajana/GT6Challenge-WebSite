<?php
  include 'database.php';

  $db = new Database();
  $conn = $db->PDOConnect();
  if(! $conn)
  {
    die('Errore di connessione al database');
  }

///////////////////////////////////////////////////////////////////////////

    $sql = "SELECT * FROM user";
    try
    {
        //preparing sql
        $stmt = $conn->prepare($sql);
        
        //exec sql
        $stmt->execute();
    }
    catch(PDOException $e)
    {
        echo json_encode(array("state"=>"KO", "message"=>$e->getMessage()));
        return;
    }

    //parsing result
    //check result
    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    //print_r($result);
    $res = $stmt->fetchAll();
    //print_r($res);
    //echo "\n";    
    foreach ($res as $key => $value) 
    {
        //print_r($value['id']);
    }

    echo json_encode($res);
    //echo json_decode($jsonEnc);

?>