const reviewsService = require("./reviews.service")
const reduceProperties = require('../utils/reduce-properties')

const reduceCritics = reduceProperties("critic_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"]
})

const VALID_PROPERTIES = [
    "review_id",
    "content",
    "score",
    "critic_id",
    "movie_id",
    "created_at",
    "updated_at"
]

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }

async function list(req, res, next) {
    const data = await reviewsService.list()
    res.json({ data })
}

async function reviewExist(req, res, next) {
    try {
        const review = await reviewsService.read(req.params.reviewId)
        if (review) {
            res.locals.review = review
            return next()
        }
        next ({
            status: 404,
            message: `Review cannot be found`
        })
    } catch (err) {
        console.error(err.message)
        next({status: 500, message: "There was an error on get"})
    }
} 

async function read(req, res, next) {
    const data = res.locals.review
    res.json({ data })
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    const data = await reviewsService.update(updatedReview)
    return next()
}

async function updatedRead(req, res, next) {
    const data = await reviewsService.updatedRead(req.params.reviewId)
    res.json({ data: reduceCritics(data)[0] })
}

async function destroy(req, res, next) {
    const review = res.locals.review
    await reviewsService.delete(review.review_id)
    res.sendStatus(204);
}

module.exports = {
    list,
    read: [reviewExist, read],
    update: [reviewExist, hasOnlyValidProperties ,update, updatedRead],
    delete: [reviewExist, destroy]
}