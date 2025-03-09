import { NextFunction, Response, Request } from "express";
import Main from "../../model/main";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import Category from "../../model/category";


export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const main = await Main.findAll({
            include: [ Category ]
        }) 
        res.json(main)
    } catch (error) {
        next(error)
    }
}

export async function getMainPerCategory(req: Request<{ categoryId: string }>, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params

        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw new AppError(StatusCodes.NOT_FOUND, `category with ID ${categoryId} not found`)
        }

        const main = await Main.findAll({
            where: {categoryId},
            include: [Category]
        })
        res.json(main)
    } catch (error) {
        next(error)
    }
}

export async function addMain(req: Request<{}, {}, {
    name: string,
    categoryId: string,
    number: number,
    date: Date,
    isRecycled: boolean
}>, res: Response, next: NextFunction) {
    try {

        const categoryExists = await Category.findByPk(req.body.categoryId)
        if (!categoryExists) {
            throw new AppError(StatusCodes.BAD_REQUEST, `Cannot add main: Category with ID ${req.body.categoryId} not found`)
        }

        const newMain = await Main.create(req.body)
        res.status(StatusCodes.CREATED).json(newMain)

    } catch (error) {
        next(error)
    }
}

export async function removeMain(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params

        const main = await Main.findByPk(id)
        if (!main) {
            throw new AppError(StatusCodes.NOT_FOUND, `Main with ID ${id} not found`)
        }

        await Main.destroy({where: {id}})
        res.status(StatusCodes.OK).json({success: true})

    } catch (error) {
        next(error)
    }
}

export async function getMainPerQuery(req: Request, res: Response, next: NextFunction) {
    try {
        const price = Number(req.query.price)
        const main = await Main.findAll({
            where: {price: {
                [Op.lte]: price
            }},
            include: [Category]
        })
        res.json(main)
    } catch (error) {
        next(error)
    }
}