const router = require("express").Router()
const controller = require("./reviews.controller")

router.route("/").get(controller.list)
router.route("/:reviewId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router