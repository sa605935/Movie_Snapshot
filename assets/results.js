$(document).ready(function () {
    //Youtube API key
    var youtubeAPIkey = "key=AIzaSyCMvE-VUEEYNHxbUoztY10VOOcSJYDCG90"
    var trailer = "trailer"

  //OMDB API key
  var omdbData = "https://www.omdbapi.com/?apikey=7af33c3a&"

  var search = "t="
  var key = "searchBar"
  var movie = localStorage.getItem(key)

  //Youtube API fetch
  // fetch(omdbData + search + youtubeAPIkey)
  //     .then(function (response) {
  //         return response.json();
  //     })
  //     .then(function (data) {
  //         console.log(data);
  //         localStorage.setItem("results", JSON.stringify(data))
  //     })

  
  // OMDB API Fetch
  var OMDBFetch = function () {
      fetch(omdbData + search + movie)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              //console.log(data);
              localStorage.setItem("results", JSON.stringify(data))
              var omdbObject = JSON.parse(localStorage.getItem("results"));

              $("#movie-search").text(omdbObject.Title)
              $("#year").text("Year: " + omdbObject.Year)
              $("#director").text("Director: " + omdbObject.Director)
              $("#actors").text("Actors: " + omdbObject.Actors)
              $("#genre").text("Genre: " + omdbObject.Genre)
              $("#score").text("Rotten Tomatoes: " + omdbObject.Ratings[1].Value)
              $("#poster").attr("src", omdbObject.Poster)
          })
  }

    OMDBFetch()
    var youtube = function () {
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + movie + " " + trailer + "&type=video&" + youtubeAPIkey)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                console.log(result)
                $("#ytplayer").attr("src", "https://www.youtube.com/embed/" + result.items[0].id.videoId)
            });
        }
        youtube()
});

