const knex = require("../db/connection")

function list() {
    return knex("reviews").select("*")
}

function read(reviewId) {
    return knex("reviews")
        .where("review_id", reviewId)
        .first()
}

function update(newReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: newReview.review_id})
        .update(newReview, "*")
        
}

// on update it wants a return with the update review, along with critic info...idk if I can do that in one function, so gonna make a seperate and use update as middleware in controller
function updatedRead(reviewId){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where("r.review_id", reviewId)
        
}

function destroy(reviewId) {
    return knex("reviews")
        .where("review_id", reviewId)
        .del()
}

module.exports = {
    list,
    read,
    update,
    updatedRead,
    delete: destroy,
}