const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  idScheme: Joi.objectId().required(),

  loginScheme: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      login: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(5).required()
    }),

  userScheme: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      login: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(5).required()
    }),

  boardScheme: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      title: Joi.string().required(),
      columns: Joi.array()
    })
};
