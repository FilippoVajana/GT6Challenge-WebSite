function GetUsersOptions() 
{ 
    this.build_url = function()
    {
        var url = window.location.href;
        var script = "/script/php/get_users.php";   

        return url + script;
    }

    this.print_result = function(result)
    {           
        //parsing JSON
        result = JSON.parse(result);

        //building options    
        var selectionOptions = document.getElementById('playerId_select'); 
        
        for (var index = 0; index < result.length; index++) 
        {
            //create new option node
            var optionTag = document.createElement("option");
            //add user data
            var element = result[index];
            optionTag.value = element.id;
            var name = (element.name).charAt(0).toUpperCase() + (element.name).slice(1);
            var nickname = (element.nickname).charAt(0).toUpperCase() + (element.nickname).slice(1);
            optionTag.innerText =  name + " [" + nickname + "]";
            //add option tag to DOM
            selectionOptions.appendChild(optionTag);            
            
        }
    }

    this.httpGet = function(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
}

GetUsersOptions.prototype.get_users_option = function()
{
    var url = this.build_url();
    var result = this.httpGet(url);
    this.print_result(result);
}