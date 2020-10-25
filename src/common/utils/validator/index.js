const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  idScheme: Joi.objectId().required(),
  userScheme: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      login: Joi.string()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string().required()
    })
};
