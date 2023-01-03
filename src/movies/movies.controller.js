const movieService = require("./movies.service");
const reduceProperties = require('../utils/reduce-properties')

const reduceCritics = reduceProperties("critic_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"] 
})

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  if (isShowing === "true") {
    const data = await movieService.isShowingTrue();
    res.json({ data });
  } else {
      const data = await movieService.list();
      res.json({ data });
  }
}

async function movieExist(req, res, next) {
    try {
        const movie = await movieService.read(req.params.movieId)
        if (movie) {
            res.locals.movie = movie
            return next()
        }
        next ({
            status: 404,
            message: `Movie cannot be found.`
        })
    } catch (err) {
        console.error(err.message)
        next({status: 500, message: "There was an error on get"})
    }
}

async function read(req, res, next) {
    const data = res.locals.movie
    res.json({ data })
}

async function showTheaters(req, res, next) {
    const data = await movieService.showTheaters(req.params.movieId) 
    res.json({ data })
}

async function showReviews(req, res, next) {
    const data = await movieService.showReviews(req.params.movieId)
    res.json({data: reduceCritics(data) })
}

module.exports = {
  list,
  read: [movieExist, read],
  showTheaters: [movieExist, showTheaters],
  showReviews: [movieExist, showReviews],
};
