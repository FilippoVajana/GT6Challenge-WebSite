<?php
  include 'database.php';

  $db = new Database();
  $conn = $db->PDOConnect();
  if(! $conn)
  {
    die('Errore di connessione al database');
  }

///////////////////////////////////////////////////////////////////////////
  $name = $_GET['name'];
  $nickname = $_GET['nickname'];
  //check if the user already exists
  $sql = "SELECT * FROM user WHERE name=:name AND nickname=:nickname";
  try
  {
    //preparing sql
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':nickname', $nickname);

    //exec sql
    $stmt->execute();

  }
  catch(PDOException $e)
  {
    echo json_encode(array("state"=>"KO", "message"=>$e->getMessage()));
    return;
  }
  //check result
  // set the resulting array to associative
  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  //print_r($result);
  $res = $stmt->fetchAll();
  //print_r($res);
  
  if(count($res) != 0)
  {
    $result = array("state"=>"KO", "message"=>"User already inserted");
    echo json_encode($result);
    return;
  }
///////////////////////////////////////////////////////////////////////////////////////  
  //sql statement
  $sql = "INSERT INTO user (name,nickname) VALUES (:name, :nickname)";

  try
  {
    //preparing sql
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':nickname', $nickname);

    //exec sql
    $stmt->execute();

    echo json_encode(array("state"=>"OK", "message"=>""));
    return;
  }
  catch(PDOException $e)
  {
    echo json_encode(array("state"=>"KO", "message"=>$e->getMessage()));
    return;
  }
?>