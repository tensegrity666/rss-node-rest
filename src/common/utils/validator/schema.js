const joi = require('joi');

const schema = {
  taskId: joi.string().required(),
  boardId: joi.string().required(),
  idSchema: joi.string().required(),
  user: joi
    .object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      name: joi
        .string()
        .min(3)
        .max(30)
        .required(),
      login: joi
        .string()
        .min(3)
        .max(30)
        .required(),
      password: joi.string().required()
    })
};

module.exports = schema;
