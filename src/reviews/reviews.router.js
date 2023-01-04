const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../utils/methodNotAllowed")

router.route("/").get(controller.list).all(methodNotAllowed)
router.route("/:reviewId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router