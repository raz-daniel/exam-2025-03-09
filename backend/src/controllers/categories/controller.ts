import { NextFunction, Response, Request } from "express";
import Category from "../../model/category";


export async function getCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const some = await Category.findAll()
        res.json(some)
    } catch (error) {
        next(error)
    }
}


