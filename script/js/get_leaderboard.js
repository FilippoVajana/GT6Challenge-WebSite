function get_data()
{
    var table = document.getElementById('leaderboard');

    for (var index = 0; index < 10; index++) 
    {
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);

        cell0.innerHTML = "pos" + index;
        cell1.innerHTML = "player" + index;
        cell2.innerHTML = "lap time" + new Date().toLocaleTimeString();        
    }
    

}
get_data();