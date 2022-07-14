// Validação
const Joi = require("@hapi/joi")

// Register validation
function registerValidation(dataFromReq) {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(dataFromReq)
}

function loginValidation(dataFromReq) {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(dataFromReq)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation