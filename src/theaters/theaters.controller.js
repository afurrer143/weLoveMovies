const theaterService = require("./theater.service")
const reduceProperties = require('../utils/reduce-properties')

const reduceTheaterAndMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    
  });

async function list(req, res, next) {
    const data = await theaterService.list()
    res.json({ data: reduceTheaterAndMovies(data) })
}

module.exports = {
    list
}