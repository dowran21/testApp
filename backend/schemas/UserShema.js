const Joi = require("joi") ;

const UserSchema = {
    Register:Joi.object({
        username:Joi.string().min(2).max(50).required(),
        birth_date:Joi.date().required(),
        password:Joi.string().min(6).max(25).required(),
        email:Joi.string().email({ tlds: { allow: false } }),
        image:Joi.string()
    }),
    Login:Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(6).max(25).required()
    })
}


module.exports = UserSchema;