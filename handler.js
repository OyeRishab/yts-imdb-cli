const request = require("request");
const fs = require("fs");
const chalk = require("chalk");

const movies = JSON.parse(fs.readFileSync("movies.json").toString()).movies;

const searchMovie = (title) => {
  const url =
    "https://search.imdbot.workers.dev/?q=" + encodeURIComponent(title);

  request(url, (error, response) => {
    if (
      response.headers["content-type"] === "application/json; charset=UTF-8"
    ) {
      const searchRes = JSON.parse(response.body).description;
      const titles = searchRes.map((movie) => movie["#IMDB_ID"]);
      const foundData = [];
      for (i = 0; i < titles.length; i++) {
        const foundResult = movies.find((movie) => movie.imdb === titles[i]);
        if (foundResult) {
          foundData.push(foundResult);
        }
      }
      foundData.length === 0
        ? console.log("Movie Not Found")
        : displayMovie(foundData);
    } else {
      console.log("Server Error");
    }
  });
};

function displayMovie(data) {
  for (i = 0; i < data.length; i++) {
    const movie = data[i];
    console.log(chalk.bgRed.bold("\nTitle :", movie.title));
    // console.log("IMDb Rating :", movie.imdb, "\n");
    // console.log("Genres :", movie.genres, "\n");
    // console.log("Summary :", movie.summary, "\n");
    for (j = 0; j < movie.torrents.length; j++) {
      const torrent = movie.torrents[j];
      console.log("Quality :", torrent.quality);
      console.log("Size :", torrent.size);
      console.log(
        "Link : https://yts.mx/torrent/download/" + torrent.hash,
        "\n"
      );
    }
  }
}

module.exports = {
  searchMovie: searchMovie,
};
