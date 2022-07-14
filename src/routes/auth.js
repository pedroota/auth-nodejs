const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { registerValidation, loginValidation } = require("../validation")

router.post("/register", async (req, res) => {

  // Validando a requisição
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send("Email já cadastrado")

  const salt = await bcrypt.genSalt(10)
  const hashdPassword = await bcrypt.hash(req.body.password, salt)
  

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashdPassword,
  })
  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch(err) {
    res.status(400).send(err)
  }
})

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).send("Email ou senha errados")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send("Senha invalida")
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header("auth-token", token).send(token)
})

module.exports = router;