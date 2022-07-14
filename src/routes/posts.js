const router = require("express").Router()

router.get("/posts", (req, res) => {
  res.json({
    posts: {
      title: "Post 1",
      description: "Descrição do post 1"
    }
  })
})

module.exports = router