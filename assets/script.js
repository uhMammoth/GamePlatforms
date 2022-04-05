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
  for(let i = 1; i < data.results.length; i++){
  var gameName = data.results[i].name;
  $("#listGames").append("<option value = '"+ i +"'>"+ gameName +"</option>");
  }
}

function displayGameData(data) {
    searchedList = data.results;
  var img = data.background_image;
  dropDown(data);
//   $("#gameImg").empty()
//   .append("<img src="+ img +">");
  console.log(data);
}

function gameHandler(data){
    //get img title metascore platforms description
    //add and create elements to main game display board
}

searchFormEl.addEventListener("submit", gameSubmit);

$(document).on('change', '#listGames', function(){
    console.log(searchedList[$(this).val()]);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => gameHandler(data));
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Jin starts here //

// Released games

// Set var for release date
var thisMonth = moment().format("YYYY-MM-01");
var today = moment().format("YYYY-MM-DD")


var releaseContainerEl = document.querySelector("#release-container");

// API for released game list
var releasedGames = function() {

    // set dates range = 1st of this month to today
    var apiUrl = 
    "https://api.rawg.io/api/games?dates=" + thisMonth + "," + today + "&key=ff8332b243a54f7db9e5249071a23ba5";

    fetch(apiUrl).then(function(response) {

      if(response.ok) {
        response.json().then(function(data) {

        releaseContainer(data.results);        
        console.log(data);
        })
      }        
    })
}

// Set release games container
var releaseContainer = function(games) {

    for (var i = 0; i < games.length; i++) {
    
        var getContainer = document.createElement("div");
        getContainer.classList = "container bg-zinc-800 border-2 p-2 my-3 border-content h-80 text-center";
        getContainer.setAttribute("data-release-container", i);
        var getSpan = document.createElement("span");
        getSpan.classList = "text-white text-xl";
        var getImgCont = document.createElement("div");
        getImgCont.classList = "container border-2 border-zinc-800 mt-2 h-60";
        var getImgSrc = document.createElement("img");
        getImgSrc.classList = "object-fill h-full w-full";

        releaseContainerEl.append(getContainer);
        getContainer.append(getSpan);
        getImgCont.append(getImgSrc);
        getContainer.append(getImgCont);

        // Add game title to the span
        var titleName = getSpan.textContent;
        titleName = games[i].name;
        getSpan.append(titleName);       
        
        // Add game img to the img element
        if (games[i].background_image) {
            getImgSrc.setAttribute("src", games[i].background_image);
            getImgSrc.setAttribute("alt", games[i].name);
        } 
    }
}


releasedGames();

// Jin ends here
///////////////////////////////////////////////////////////////////////////////////////////////
