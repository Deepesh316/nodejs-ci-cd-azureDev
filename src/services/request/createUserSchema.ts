import Joi from "@hapi/joi";

/**
 * @description used to define validation schema for req params
 */
const createUserSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(4)
    .max(15)
    .required()
});

export default createUserSchema;
