// Get Game info
var searchedList;

var gameSubmit = function(event) {
    
    $('#listGames').remove();
    event.preventDefault();

  var gameName = $('#searchName').val();
  $('#searchName').val('');
  if (gameName) {
    getRawgapi(gameName);
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

// function embedVideo(data){
// console.log(data);

// var videoId = data.items[0].id.videoId;
// var trailerVi = "https://www.youtube.com/embed/"+ videoId ;

// $("#trailer").empty()
// .append("<iframe width='503' height='280' src="+ trailerVi +" frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>");

// }

function displayGameData(data) {
  searchedList = data.results;
  dropDown(data);
}

$(document).on('change', '#listGames', function(){
  var apiKey = "ff8332b243a54f7db9e5249071a23ba5";
  var gameUrl = "https://api.rawg.io/api/games/"+ searchedList[$(this).val()].slug +"?key=" + apiKey;
  
  // var youtubeSearch = searchedList[$(this).val()].name;  
  // var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+ youtubeSearch +"%20game%20trailer&topicId=%2Fm%2F0bzvm2&key=AIzaSyAEGvruHG5yV_9vHTGqtP00RPTMAkmCZEY"
  
  // fetch(youtubeUrl)
  //   .then(response => response.json())
  //   .then(data => embedVideo(data));
  
  fetch(gameUrl)
      .then(response => response.json())
      .then(data => gameHandler(data));
});

function gameHandler(data) {
  //get img title metascore platforms description
  //add and create elements to main game display board
  var img = data.background_image;
  $("#gameImg").empty()
  // .addClass("<img class='object-cover' src="+ img +">");
  .css('background-image', 'url("' + img + '")');
  $(".gameTitle h1").empty()
  .append(data.name);
  $("#description").empty()
  .append(data.description);
  $("#gameInfo").empty()
  .append("<p class='my-2 p-2 w-fit bg-red-600 text-white rounded-full text-xl'>Metacritic:"+ data.metacritic +"</p>");
  $("#gameInfo")
  .append("<p class='my-2 p-2 w-fit bg-green-600 text-white rounded-full text-xl'>Released Date:"+ data.released +"</p>");
   $("#listPlatform").empty()
  for(let i = 0; i < data.parent_platforms.length; i++) {
    var listPlatforms = data.parent_platforms[i].platform.name;
   $("#listPlatform")
    .append("<li>"+ listPlatforms +"</li>");
  }
  
}


$('#searchBar').on("submit", gameSubmit);


////////////////////////////////////////////////////////////////////////////////////////////////
// Jin starts here //

// Released games

// Set var for release date
// var thisMonth = moment().format("YYYY-MM-01");
// var today = moment().format("YYYY-MM-DD")


var releaseContainerEl = document.querySelector("#release-container");

// API for released game list
var releasedGames = function() {

    // set dates range = 1st of this month to today
    var apiUrl = 
    "https://api.rawg.io/api/games?key=ff8332b243a54f7db9e5249071a23ba5&ordering=-released";

    fetch(apiUrl).then(function(response) {

      if(response.ok) {
        response.json().then(function(data) {

        releaseContainer(data.results);        
        
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
