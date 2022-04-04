// Get Game info
var searchFormEl = document.querySelector("#searchBar");
var gameInputEl = document.querySelector("#searchName");

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
  for(let i = 1; i < data.results.length; i++){
  var gameName = data.results[i].name;
  $("#listGames").append("<option value = '"+ gameName +"'>"+ gameName +"</option>");
  }
  
}


function displayGameData(data) {
  var img = data.background_image;
  dropDown(data);
//   $("#gameImg").empty()
//   .append("<img src="+ img +">");
  console.log(data);
}




searchFormEl.addEventListener("submit", gameSubmit)
$(document).on('change', '#listGames', function(){
    //search array with select value and move on to call functions that update game information
    console.log($(this).val());
});