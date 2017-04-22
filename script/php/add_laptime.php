<?php
include 'database.php';

    $db = new Database();
    $conn = $db->PDOConnect();
    if(! $conn)
    {
        die('Errore di connessione al database');
    }
///////////////////////////////////////////////////////////////////////////
    $playerId = $_GET['id'];
    $laptime = $_GET['laptime'];

    //get player id
    $sql = "INSERT INTO laptime (id_player, time) VALUES (:playerId, :laptime)";
    try
    {
        //preparing sql
        $stmt = $conn->prepare($sql);    
        $stmt->bindParam(':playerId', $playerId);
        $stmt->bindParam(':laptime', $laptime);
        //exec sql
        $stmt->execute();

        echo json_encode(array("state"=>"OK", "message"=>"Tempo inserito"));
        return;
    }
    catch(PDOException $e)
    {
        echo json_encode(array("state"=>"KO", "message"=>$e->getMessage()));
        return;
    }

  //check result
  // set the resulting array to associative
  //$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  //print_r($result);
  //$res = $stmt->fetchAll();
  //print_r($res);
?>