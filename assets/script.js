//get list of newest games
var apiCall = function(){
    var apiKey = ff8332b243a54f7db9e5249071a23ba5;
    var listGames = 'https://api.rawg.io/api/games?key=' + apiKey;
    fetch(listGames)
        .then(response => response.json())
        .then(data => sideBarHandler(data));

}

var sideBarHandler = function (data){

    for (let index = 0; index < 5; index++) {
        
        createSideBarEl();
        div title = data.name[i]
        div.backgroundimg = data.thumbnail
    }
    
}

var createSideBarEl = function (){
    $('#sidebar').append('div');
    div title
}

var divClicked = function (){
    searchInput = createSideBarEl.text
}

eventlistenerforsidebarEl
// apiCall();
