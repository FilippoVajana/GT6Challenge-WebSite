function LeaderboardBuilder()
{
    this.getTimesUrl = function()
    {
        var url = window.location.href;
        var script = "/script/php/get_best_laptimes.php";   
        return url + script;
    }

    this.httpGet = function(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    this.buildLaptimesTable = function(result)
    {
        //parsing JSON
        result = JSON.parse(result);
        //get leaderboard element
        var leaderboard = document.getElementById("leaderboard");
        //fill leaderboard
        for (var index = 0; index < result.length; index++)
        {
            var element = result[index];
            //row
            var row = document.createElement("tr");
            //data
            var timeName = (element.name).charAt(0).toUpperCase() + (element.name).slice(1) + "\t[" + (element.nickname).charAt(0).toUpperCase() + (element.nickname).slice(1) + "]";
            var data = [index + 1, timeName, element.time];
            //append data to row
            data.forEach(function(e) 
            {
               var dataTag = document.createElement("td");
               dataTag.innerText = e;

               row.appendChild(dataTag); 
            }, this);

            //append row
            leaderboard.appendChild(row);

        }

    }

    this.last_update = function()
    {
        var time = new Date().toLocaleString();
        var tag = document.getElementById("leaderboard_update");
        tag.innerText += "\t\t" + time;
    }
}

LeaderboardBuilder.prototype.get_leaderboard = function()
{
    var url = this.getTimesUrl();
    var result = this.httpGet(url);
    this.buildLaptimesTable(result);
    this.last_update();
}

