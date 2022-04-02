// Get Game info
function getRawgapi(game) {
  var apiKey = ff8332b243a54f7db9e5249071a23ba5;
  var apiUrl = "https://api.rawg.io/api/games/" + game + "?key=" + apiKey;

  fetch(apiUrl).then(function(response) {
    return response.json();
  })
  .then(function (data) {
    
  })
}