// Get Game info
var searchedList;

//converts epoch todays date to YYY-MM-DD format
var convertDate = function(num){
  var myDate = new Date(num);
  var monthDayYear = myDate.toLocaleString().split(',')[0];
  var dateArr = monthDayYear.split('/');
  if (dateArr[0].length === 1) {
    dateArr[0] = "0"+ dateArr[0];
  }
  if (dateArr[1].length === 1) {
    dateArr[1] = "0"+ dateArr[1];
  }
  var date = dateArr[2] +"-"+ dateArr[0] +"-"+ dateArr[1];
  return date;
}

//Get the searched input for gameName.
var gameSubmit = function(event) {
    $('#listGames').remove();
    event.preventDefault();

  var gameName = $('#searchName').val();
  $('#searchName').val('');
  if (gameName) {
    getRawgapi(gameName);
  };
  
}

//Takes search of gameName and api key then inputs them in the api URL then makes the fetch request.
function getRawgapi(gameName) {
  var apiKey = "ff8332b243a54f7db9e5249071a23ba5";
  var apiUrl = "https://api.rawg.io/api/games?key=" + apiKey +"&search="+ gameName.replace(/\s/g, "-") +"&search_exact=true&ordering=-metacritic";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayGameData(data));
}

//Gets the data results of the searched game name with it index value then is displayed as a dropdown list.
function dropDown(data){
    $("#searchBar")
  .append("<select name='game' id='listGames' class='w-1/4 text-base lg:text-xl lg:w-1/4 lg:p-3 sm:p-1'></select>");
  $("#listGames")
  .append("<option>Select Game</option>");
  for(let i = 0; i < data.results.length; i++){
  var gameName = data.results[i].name;
  $("#listGames").append("<option value = '"+ i +"'>"+ gameName +"</option>");
  }
  
}

//Takes the first video of the data items results then embeds the video to the html.
function embedVideo(data){
console.log(data);
var videoId = data.items[0].id.videoId;
var trailerVi = "https://www.youtube.com/embed/"+ videoId ;
$("#trailer").empty()
.append("<iframe width='503' height='280' src="+ trailerVi +" frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>");
}

//
function displayGameData(data) {
  searchedList = data.results;
  dropDown(data);
}

//
function fetchGame(){
  var apiKey = "ff8332b243a54f7db9e5249071a23ba5";
  var slug;
  var youtubeSearch
  if ($(this).attr('gameId')) {
    slug = $(this).attr('gameId');
    youtubeSearch = $(this).attr('gameName');
  }
  else {
    slug = searchedList[$(this).val()].slug;
    youtubeSearch = searchedList[$(this).val()].name;
  }
  var gameUrl = "https://api.rawg.io/api/games/"+ slug +"?key=" + apiKey;
  
  var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+ youtubeSearch +"%20game%20trailer&topicId=%2Fm%2F0bzvm2&key=AIzaSyAEGvruHG5yV_9vHTGqtP00RPTMAkmCZEY"
  
  fetch(youtubeUrl)
    .then(response => response.json())
    .then(data => embedVideo(data));
  
  fetch(gameUrl)
      .then(response => response.json())
      .then(data => gameHandler(data));
}

//Get the data then displays the img, name, description, metacritic, released date and the list of platforms.
function gameHandler(data) {
  console.log(data);
  var img = data.background_image;

  $("#gameImg").empty()
  .css({'background-image': 'url("' + img + '")', 'background-size': 'cover', 'background-position-x': 'center', 'background-position-y': 'center'});

  $(".gameTitle").html(data.name);
  $("#description").html(data.description);

  $("#gameInfo").html("<p class='p-1 lg:my-2 lg:p-3 md:p-1 w-fit bg-red-600 text-white rounded-full text-xs lg:text-2xl sm:text-xl'>Metacritic: "+ data.metacritic +"</p>");

  $("#gameInfo").append("<p class='p-1 lg:my-2 lg:p-3 md:p-1 w-fit bg-green-600 text-white rounded-full text-xs lg:text-2xl sm:text-xl'>Released Date: "+ data.released +"</p>");
  
   $("#listPlatform").empty();

  for(let i = 0; i < data.parent_platforms.length; i++) {
    var listPlatforms = data.parent_platforms[i].platform.name;
   $("#listPlatform")
    .append("<li>"+ listPlatforms +"</li>");
  
  // add class for <li> element for platforms
   $("#listPlatform").find("li").addClass("font-black text-zinc-900 rounded-2xl border-4 border-cyan-500 m-4 p-3 text-xs lg:text-2xl sm:text-xl")    
  }
  
  // not able to control media query with display-grid
  $('#gameDashboard').css('display', 'flex');
}

//loads localstorage for 'history'
function loadHistory(){
  var history = JSON.parse(localStorage.getItem('history'));
  if(history == null){
    history = [];
    history.push({date: '0'});
  }
  return history;
}

function saveHistory(history){
  localStorage.setItem('history', JSON.stringify(history));  
}

// API for released game list
var releasedGames = function() {
  var date = new Date();
  var endDate = convertDate(date.getTime());
  var startDate = convertDate(date.getTime() - 2592000*1000); 
  
  // set dates range = 1st of this month to today
  var apiUrl = 
  "https://api.rawg.io/api/games?key=ff8332b243a54f7db9e5249071a23ba5&metacritic=75,100&dates="+startDate+","+endDate+"&ordering=-metacritic&page_size=5";


  var history = loadHistory();
  //loadhistory if arr[0] != endDate(today) then fetch
  if(history.at(-1).date != endDate){
    history.pop();
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => updateArray(data.results, history, endDate));
  } 
  else if (history.at(-1).date == endDate){
    releaseContainer(history);
  }
}

//
function updateArray(data, history, endDate){
  for (let i = 0; i < data.length; i++) {
    history[i] = {
      id: data[i].id,
      name: data[i].name,
      background_image: data[i].background_image
    };
  }
  history.push({date: endDate});
  saveHistory(history);
  releaseContainer(history);
}

// Set release games container
var releaseContainer = function(games) {
    for (var i = 0; i < games.length-1; i++) {
      var releaseContainerEl = document.querySelector("#release-container");
      var gameContainer = document.createElement("div");
      gameContainer.classList = "gameContainer container bg-zinc-800 border-2 p-2 my-3 border-content h-80 text-center";
      gameContainer.setAttribute('gameId', games[i].id);
      gameContainer.setAttribute('gameName', games[i].name);

      var getSpan = document.createElement("span");
      getSpan.classList = "text-white text-xl";
      var getImgCont = document.createElement("div");
      getImgCont.classList = "container border-2 border-zinc-800 mt-2 h-60";
      var getImgSrc = document.createElement("img");
      getImgSrc.classList = "object-fill h-full w-full";

      releaseContainerEl.append(gameContainer);
      gameContainer.append(getSpan);
      getImgCont.append(getImgSrc);
      gameContainer.append(getImgCont);

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

//
releasedGames();
$('#searchBar').on("submit", gameSubmit);
$(document).on('change', '#listGames', fetchGame);
$(document).on("click",".gameContainer", fetchGame);
