const knex = require("../db/connection")

function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "m.*")
        .orderBy("mt.theater_id")
        // .groupBy("t.theater_id", "m.movie_id")
}

module.exports = {
    list
}