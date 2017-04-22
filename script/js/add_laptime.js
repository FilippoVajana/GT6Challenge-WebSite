function add_laptime()
{
    var playerId = document.getElementById("playerId_select");
    playerId = playerId.options[playerId.selectedIndex].value;
    var laptime = document.getElementById('player_laptime').value;
    //input validation
    if(input_validation(playerId, laptime) == false)
    {
        print_op_result("KO", "Errore nei dati");
        return;
    }
    //build GET request
    var request = build_request_url(playerId, laptime);
    //send request and read reply
    var result = httpGet(request);
    result = JSON.parse(result);
    //print result
    print_op_result(result.state, result.message);
}

function input_validation(playerId, laptime)
{
    //check playerId not null
    if(playerId == "")
        return false;
    //check laptime string format
    var regex = new RegExp("\d:\d\d.\d\d\d");
    if(regex.test(laptime))
        return false;

    return true;
}

function print_op_result(state, message)
{
    var footer = document.getElementById('add_laptime_result');   
    if(state == "OK")
    {
        footer.className = "alert alert-success";          
    }
    else
    {        
        footer.className = "alert alert-danger";        
    }    
    footer.innerHTML = message;
}

function build_request_url(playerId, laptime)
{
    var url = window.location.href;
    var script = "/script/php/add_laptime.php";
    var params = "?id=" + playerId + "&laptime=" + laptime;

    return url + script + params;
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}