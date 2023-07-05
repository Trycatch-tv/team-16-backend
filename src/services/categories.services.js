import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import sequelize from "../config/database.js";
import { logger } from './log.services.js';

const Op = sequelize.Sequelize.Op;

export const getAllServ = async(limit, page) => {
    try {
        const size = await Category.count();
        const totalPages = Math.ceil(size / limit);
        const offset = (page - 1) * limit;
        let nextPage = page + 1;
        let lastPage = page - 1;

        if (nextPage > totalPages) {
            nextPage = totalPages;
        }

        if (lastPage == 0) {
            lastPage = 1;
        }

        const categories = await Category.findAll({
            limit,
            offset,
            attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userId', 'parentId'] },
            order: [
                ['id', 'DESC']
            ],
            include: [{
                    model: Category,
                    as: 'subcategories',
                    attributes: {
                        exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userId', 'parentId']
                    }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'lastname', 'email']
                }
            ]
        });
        return {
            statusCode: 200,
            categories,
            page,
            limit,
            total: size,
            pages: totalPages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get categories: ', error);
        return { statusCode: 500, message: 'Failed to get categories' };
    }
}

export const getAllDeletedServ = async(limit, page) => {
    try {
        const size = await Category.count();
        const totalPages = Math.ceil(size / limit);
        const offset = (page - 1) * limit;
        let nextPage = page + 1;
        let lastPage = page - 1;

        if (nextPage > totalPages) {
            nextPage = totalPages;
        }

        if (lastPage == 0) {
            lastPage = 1;
        }
        const categories = await Category.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userId', 'parentId'] },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                    model: Category,
                    as: 'subcategories',
                    attributes: {
                        exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userId', 'parentId']
                    }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'lastname', 'email']
                }
            ],
            offset,
            limit
        });
        return {
            statusCode: 200,
            categories,
            page,
            limit,
            total: size,
            pages: totalPages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get categories deleted: ', error);
        return { statusCode: 500, message: 'Failed to get categories deleted' };
    }
}

export const getByIdServ = async(req) => {
    try {
        const { params, method, originalUrl, userId } = req;

        const { id } = params;
        const category = await Category.findOne({
            paranoid: true,
            where: {
                id
            },
            attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userId', 'parentId'] },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                    model: Category,
                    as: 'subcategories',
                    attributes: {
                        exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userId', 'parentId']
                    }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'lastname', 'email']
                }
            ]
        });
        await logger(`Category with id: ${id} was successfully searched!`, method, originalUrl, userId);

        return {
            statusCode: 200,
            category
        }
    } catch (error) {
        console.error('Failed to get category: ', error);
        return { statusCode: 500, message: 'Failed to get category' };
    }
}

export const createServ = async(req) => {
    const { body, method, originalUrl, userId } = req;
    const { name, description, parentId } = body;
    try {
        const category = await Category.create({
            name,
            description,
            parentId,
            userId
        });
        if (category) {
            await logger(`Category created successfully!`, method, originalUrl, userId);
            return { statusCode: 201, message: "Category created successfully!" };
        } else {
            await logger(`Failed to create category`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to create category' };
        }
    } catch (error) {
        console.error('Failed to create category: ', error);
        return { statusCode: 500, message: 'Failed to create category' };
    }
}

export const updateServ = async(req) => {
    const { params, body, method, originalUrl, userId } = req;
    const { id } = params;
    const { name, description, parentId } = body;
    try {
        const category = await Category.update({
            name,
            description,
            parentId,
            userId
        }, { where: { id } });
        if (category) {
            await logger(`Category updated successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Category updated successfully!" };
        } else {
            await logger(`Failed to update category`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to update category' };
        }
    } catch (error) {
        console.error('Failed to update category: ', error);
        return { statusCode: 500, message: 'Failed to update category' };
    }
}

export const deleteServ = async(req) => {
    const { params, method, originalUrl, userId } = req;
    const { id } = params;
    try {
        const category = await Category.destroy({ where: { id } });
        if (category) {
            await logger(`Category deleted successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Category deleted successfully!" };
        } else {
            await logger(`Failed to delete category`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to delete category' };
        }
    } catch (error) {
        console.error('Failed to delete category: ', error);
        return { statusCode: 500, message: 'Failed to delete category' };
    }
}

export const restoreServ = async(req) => {
    const { params, method, originalUrl, userId } = req;
    const { id } = params;
    try {
        const category = await Category.restore({ where: { id } });
        if (category) {
            await logger(`Category restored successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Category restored successfully!" };
        } else {
            await logger(`Failed to restore category`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to restore category' };
        }
    } catch (error) {
        console.error('Failed to restore category: ', error);
        return { statusCode: 500, message: 'Failed to restore category' };
    }
}