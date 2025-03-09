import { Router } from "express";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/param-validation";
import queryValidation from "../middlewares/query-validation";
import { addMain, getMainPerQuery, getMainPerCategory, removeMain } from "../controllers/mains/controller";
import { deleteValidator, getMainPerQueryValidator, getPerSomeValidator, newMainValidator } from "../controllers/mains/validator";



const mainsRouter = Router()

mainsRouter.get('/', )
mainsRouter.get('/query', queryValidation(getMainPerQueryValidator), getMainPerQuery)
mainsRouter.get('/category/:categoryId', paramsValidation(getPerSomeValidator), getMainPerCategory)
mainsRouter.post('/', validation(newMainValidator), addMain)
mainsRouter.delete('/:id', paramsValidation(deleteValidator), removeMain)

export default mainsRouter