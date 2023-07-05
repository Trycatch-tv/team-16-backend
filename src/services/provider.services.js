import User from '../models/user.model.js';
import Provider from '../models/provider.model.js';
import sequelize from "../config/database.js";
import { logger } from './log.services.js';

const Op = sequelize.Sequelize.Op;

export const getAllServ = async(limit, page) => {
    try {
        const size = await Provider.count();
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

        const providers = await Provider.findAll({
            paranoid: true,
            attributes: ['id', 'name', 'address', 'city', 'state', 'zip', 'phone', 'email', 'website', 'status'],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ['name', 'lastname', 'email', 'username', 'status']
            }],
            offset,
            limit
        });
        return {
            statusCode: 200,
            providers,
            page,
            limit,
            total: size,
            pages: totalPages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get providers: ', error);
        return { statusCode: 500, message: 'Failed to get providers' };
    }
}

export const getAllDeletedServ = async(limit, page) => {
    try {
        const size = await Provider.count();
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

        const providers = await Provider.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            attributes: ['id', 'name', 'address', 'city', 'state', 'zip', 'phone', 'email', 'website', 'status'],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ['name', 'lastname', 'email', 'username', 'status']
            }],
            offset,
            limit
        });
        return {
            statusCode: 200,
            providers,
            page,
            limit,
            total: size,
            pages: totalPages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get providers deleted: ', error);
        return { statusCode: 500, message: 'Failed to get providers deleted' };
    }
}

export const getByIdServ = async(req) => {
    try {
        const { params, method, originalUrl, userId } = req;

        const { id } = params;
        const provider = await Provider.findOne({
            paranoid: true,
            where: {
                id
            },
            attributes: ['id', 'name', 'address', 'city', 'state', 'zip', 'phone', 'email', 'website', 'status'],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ['name', 'lastname', 'email', 'username', 'status']
            }]
        });
        await logger(`Provider with id: ${id} was successfully searched!`, method, originalUrl, userId);

        return {
            statusCode: 200,
            provider
        }
    } catch (error) {
        console.error('Failed to get provider: ', error);
        return { statusCode: 500, message: 'Failed to get provider' };
    }
}

export const createServ = async(req) => {
    const { body, method, originalUrl, userId } = req;
    const { name, address, city, state, zip, phone, email, website, status } = body;
    try {
        const provider = await Provider.create({
            name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            website,
            status,
            userId
        });
        if (provider) {
            await logger(`Provider created successfully!`, method, originalUrl, userId);
            return { statusCode: 201, message: "Provider created successfully!" };
        } else {
            await logger(`Failed to create provider`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to create provider' };
        }
    } catch (error) {
        console.error('Failed to create provider: ', error);
        return { statusCode: 500, message: 'Failed to create provider' };
    }
}

export const updateServ = async(req) => {
    const { params, body, method, originalUrl, userId } = req;
    const { id } = params;
    const { name, address, city, state, zip, phone, email, website, status } = body;
    try {
        const provider = await Provider.update({
            name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            website,
            status,
            userId
        }, { where: { id } });
        if (provider) {
            await logger(`Provider updated successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Provider updated successfully!" };
        } else {
            await logger(`Failed to update provider`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to update provider' };
        }
    } catch (error) {
        console.error('Failed to update provider: ', error);
        return { statusCode: 500, message: 'Failed to update provider' };
    }
}

export const deleteServ = async(req) => {
    const { params, method, originalUrl, userId } = req;
    const { id } = params;
    try {
        const provider = await Provider.destroy({ where: { id } });
        if (provider) {
            await logger(`Provider deleted successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Provider deleted successfully!" };
        } else {
            await logger(`Failed to delete provider`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to delete provider' };
        }
    } catch (error) {
        console.error('Failed to delete provider: ', error);
        return { statusCode: 500, message: 'Failed to delete provider' };
    }
}

export const restoreServ = async(req) => {
    const { params, method, originalUrl, userId } = req;
    const { id } = params;
    try {
        const provider = await Provider.restore({ where: { id } });
        if (provider) {
            await logger(`Provider restored successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Provider restored successfully!" };
        } else {
            await logger(`Failed to restore provider`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to restore provider' };
        }
    } catch (error) {
        console.error('Failed to restore provider: ', error);
        return { statusCode: 500, message: 'Failed to restore provider' };
    }
}