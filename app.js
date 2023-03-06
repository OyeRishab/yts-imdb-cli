const yargs = require("yargs");
const { searchMovie } = require("./handler");

yargs.command({
  command: "search",
  describe: "movie to search",
  builder: {
    title: { describe: "title of movie", demandOption: true, type: "string" },
  },
  handler: function (argv) {
    searchMovie(argv["title"]);
  },
});
yargs.parse();
