// Get Game info

var searchedList;
var apiUrl;

var gameSubmit = function(event) {
    $('#listGames').remove();
    event.preventDefault();

  var gameName = $('#searchName').val();
  if (gameName) {
    getRawgapi(gameName)
    gameInputEl.value = "";
  };
  
}

function getRawgapi(gameName) {
  var apiKey = "ff8332b243a54f7db9e5249071a23ba5";
  var apiUrl = "https://api.rawg.io/api/games?key=" + apiKey +"&search="+ gameName.replace(/\s/g, "-") +"&search_exact=true";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayGameData(data));
}

function dropDown(data){
    $("#searchBar")
  .append("<select name='game' id='listGames' class='w-1/4 p-3'></select>");
  $('#listGames').append("<option value = '"+ i +"'>Select a Game</option>");
  for(let i = 0; i < data.results.length; i++){
  var gameName = data.results[i].name;
  $("#listGames").append("<option value = '"+ i +"'>"+ gameName +"</option>");
  }
  
}


function displayGameData(data) {
    searchedList = data.results;
  // var img = data.background_image;
  dropDown(data);
//   $("#gameImg").empty()
//   .append("<img src="+ img +">");
  console.log(data);
}

function gameHandler(data){
    //get img title metascore platforms description
    //add and create elements to main game display board
    var img = data.background_image;
    $("#gameImg").empty()
  .append("<img src="+ img +">");
}

$(document).on('change', '#listGames', function(){
    console.log(searchedList[$(this).val()]);
    fetch(this.val)
        .then(response => response.json())
        .then(data => gameHandler(data));
});

$('#searchBar').on("submit", gameSubmit);

