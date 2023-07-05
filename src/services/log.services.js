import { getNowDate, getNowTime } from '../helpers/generateDate.helpers.js';
import Log from '../models/log.model.js';
import User from '../models/user.model.js';

export const logger = async(desc, method, url, userid) => {
    try {
        await Log.create({
            date: getNowDate(),
            hour: getNowTime(),
            description: desc,
            method: method,
            url: url,
            userId: userid
        });
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, message: 'Failed to logger data' };
    }
}

export const getAllLogs = async(limit, page) => {
    try {
        const total = await Log.count();
        const pages = Math.ceil(total / limit);
        const offset = (page - 1) * limit;
        let nextPage = page + 1;
        let lastPage = page - 1;

        if (nextPage > pages) {
            nextPage = pages;
        }

        if (lastPage == 0) {
            lastPage = 1;
        }
        const logs = await Log.findAll({
            // paranoid: true,
            attributes: ['id', 'date', 'hour', 'description', 'method', 'url'],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'lastname']
            }],
            offset,
            limit
        });
        return {
            statusCode: 200,
            logs,
            page,
            limit,
            total,
            pages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get logs: ', error);
        return { statusCode: 500, message: 'Failed to get logs' };
    }
}