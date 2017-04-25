<?php  
  class Database
  {
    function GetUserCredentials($user)
    {
        //read JSON
        $json = file_get_contents('credentials.json');

        //decode
        $json_data = json_decode($json, true);
        //echo $json_data;

        //get user entry
        foreach($json_data as $key => $value)
        {
            if($json_data[$key]["Username"] == $user)
            {
                return $json_data[$key];
            }
        }
    }

    function PDOConnect()
    {
        //select user 
        //$user = "user"; //default user       
        //if(isset($_SESSION["USER_LOGGED"])) //check for admin
        //{
        //    $user = $_SESSION["USER_LOGGED"];
        //}

        //get credentials
        $user_credentials = Database::GetUserCredentials($user);
        $username = "user";
        $password = "";
        $server = "192.168.1.103";
        $db = "gt6";
        //print_r($user_credentials);
        
        //connect
        try
        {
            $conn = new PDO("mysql:host={$server};dbname={$db}", "{$username}", "{$password}");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;            
        }
        catch(PDOException $e)
        {
            die("KO\n" . $e->getMessage());  
            //return null;          
        }        
    }    
  }


?>