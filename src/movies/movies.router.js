const router = require("express").Router()
const controller = require("./movies.controller")
const methodNotAllowed = require("../utils/methodNotAllowed")

router.route("/").get(controller.list).all(methodNotAllowed)
router.route("/:movieId").get(controller.read).all(methodNotAllowed)
router.route("/:movieId/theaters").get(controller.showTheaters).all(methodNotAllowed)
router.route("/:movieId/reviews").get(controller.showReviews).all(methodNotAllowed)

module.exports = router