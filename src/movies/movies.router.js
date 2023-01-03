const router = require("express").Router()
const controller = require("./movies.controller")

router.route("/").get(controller.list)
router.route("/:movieId").get(controller.read)
router.route("/:movieId/theaters").get(controller.showTheaters)
router.route("/:movieId/reviews").get(controller.showReviews)

module.exports = router