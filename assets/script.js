// Get Game info
var searchFormEl = document.querySelector("#searchBar");
var gameInputEl = document.querySelector("#searchName");
var searchedList;

var gameSubmit = function(event) {
    $('#listGames').remove();
    event.preventDefault();

  var gameName = gameInputEl.value;
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
  $("#listGames")
  .append("<option>Select Game</option>");
  for(let i = 0; i < data.results.length; i++){
  var gameName = data.results[i].name;
  $("#listGames").append("<option value = '"+ i +"'>"+ gameName +"</option>");
  }
  
}


function displayGameData(data) {
  searchedList = data.results;
  // var img = data.background_image;
  dropDown(data);
  
  console.log(data);
}

$(document).on('change', '#listGames', function(){
  var apiKey = "ff8332b243a54f7db9e5249071a23ba5";
  var gameUrl = "https://api.rawg.io/api/games/"+ searchedList[$(this).val()].slug +"?key=" + apiKey;
  
  console.log(searchedList[$(this).val()].slug);
  fetch(gameUrl)
      .then(response => response.json())
      .then(data => gameHandler(data));
});

function gameHandler(data) {
  //get img title metascore platforms description
  //add and create elements to main game display board
  var img = data.background_image;
  console.log(data);
  $("#gameImg").empty()
  .append("<img src="+ img +">");
  $(".container h1").empty()
  .append(data.name);
  $("#description").empty()
  .append(data.description);
  $("#metaScore").empty()
  .append(data.metacritic);
  $("#release").empty()
  .append(data.released);
   $("#listPlatform").empty()
  for(let i = 0; i < data.parent_platforms.length; i++) {
    var listPlatforms = data.parent_platforms[i].platform.name;
   $("#listPlatform")
    .append("<li>"+ listPlatforms +"</li>");
  }
  
}






searchFormEl.addEventListener("submit", gameSubmit)
