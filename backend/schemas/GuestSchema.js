const Joi = require("joi") ;

const GuestSchema = {
    LangParam:Joi.object({
        lang:Joi.string().valid("ru", "tk").required()
    }),
    LangIdParam:Joi.object({
        lang:Joi.string().valid("ru", "tk").required(),
        id:Joi.number().required().min(1)
    }),

}

module.exports = GuestSchema