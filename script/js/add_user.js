function add_user()
{
    var modal = document.getElementsByClassName('modal-header');
    var name = document.getElementById('user_name').value;
    var nickname = document.getElementById('user_nickname').value;

    if(input_validator(name, nickname) == false)
    {
        print_result(JSON.stringify({"state":"KO","message":"Dati non validi"}));
        return;
    }

    var url = build_url(name, nickname);
    var result = httpGet(url);

    print_result(result);
}

function build_url(name, nickname)
{
    var url = window.location.href;
    var script = "/script/php/add_user.php";
    var params = "?name=" + name + "&nickname=" + nickname;

    return url + script + params;
}

function print_result(result)
{
    var footer = document.getElementById('add_user_result');
    //footer.role = "alert";
    //parsing JSON
    result = JSON.parse(result);
    if(result.state == "OK")
    {
        footer.className = "alert alert-success";  
        footer.innerHTML = "Giocatore aggiunto";   
    }
    else
    {
        footer.className = "alert alert-danger";
        footer.innerHTML = result.message;
    }    
}

function input_validator(name, nickname)
{
    if(name == "" || nickname == "")
    {
        return false;
    }

    return true;
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
//add_user();