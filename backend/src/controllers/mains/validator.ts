import Joi from "joi";

export const newMainValidator = Joi.object({
    name: Joi.string().max(255).required(),
    categoryId: Joi.string().uuid().required(),
    number: Joi.number().min(0).required(),
    date: Joi.date().required(),
    isRecycled: Joi.boolean().required()
})

export const getPerSomeValidator = Joi.object({
    categoryId: Joi.string().uuid().required()
})

export const deleteValidator = Joi.object({
    id: Joi.string().uuid().required()
})

export const getMainPerQueryValidator = Joi.object({
    price: Joi.number().min(0).required()
})