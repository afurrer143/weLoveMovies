const knex = require("../db/connection")


function list () {
    return knex("movies").select("*")
}

function isShowingTrue () {
    // So i need to get only movies where is_showing from the movies_theaters table is true. So I can join here, and get the is_showing and do a where is_showing true
    // Note I need the router to have something for ?is_showing=true to do this one
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*") //should return only the normal movie info 
        .where("mt.is_showing", true)
        .groupBy("m.movie_id", "mt.is_showing")
        .orderBy("m.movie_id")
}

function read (movieId) {
    return knex("movies")
        .select("*")
        .where("movie_id", movieId)
        .first()
}

function showTheaters (movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.is_showing", "m.movie_id", "m.title")
        .where("m.movie_id", movieId)
}

function showReviews (movieId){
    return knex("movies as m")
        .join("reviews as r", "m.movie_id", "r.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where("m.movie_id", movieId)
        
}

module.exports = {
    list,
    isShowingTrue,
    read,
    showTheaters,
    showReviews,
}