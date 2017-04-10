function get_current_time()
{
    var time = new Date().toLocaleString();
    document.getElementById('leaderboard_update').innerHTML += time;    
} 

get_current_time();