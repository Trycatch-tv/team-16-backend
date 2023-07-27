import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import Provider from '../models/provider.model.js';
import Product from '../models/product.model.js';
import sequelize from "../config/database.js";
import { logger } from './log.services.js';
import cloudinary from '../config/cloudinary.js';
import { checkFolderCreate, deleteImageStorage } from "../helpers/image.helpers.js";

const Op = sequelize.Sequelize.Op;

export const getAllServ = async(limit, page) => {
    try {
        const size = await Product.count();
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


        const products = await Product.findAll({
            limit,
            offset,
            attributes: { exclude: ['public_id', 'deletedAt', 'createdAt', 'updatedAt', 'userId', 'categoryId', 'providerId'] },
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: Category,
                as: 'category',
                attributes: ['name']
            }, {
                model: Provider,
                as: 'provider',
                attributes: ['name', 'address', 'city', 'state']
            }, {
                model: User,
                as: 'user',
                attributes: ['name', 'lastname', 'email']
            }]
        });
        return {
            statusCode: 200,
            products,
            page,
            limit,
            total: size,
            pages: totalPages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get products: ', error);
        return { statusCode: 500, message: 'Failed to get products' };
    }
}

export const getAllDeletedServ = async(limit, page) => {
    try {
        const size = await Product.count();
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
        const products = await Product.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            attributes: { exclude: ['public_id', 'deletedAt', 'createdAt', 'updatedAt', 'userId', 'categoryId', 'providerId'] },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: Category,
                as: 'category',
                attributes: ['name']
            }, {
                model: Provider,
                as: 'provider',
                attributes: ['name', 'address', 'city', 'state']
            }, {
                model: User,
                as: 'user',
                attributes: ['name', 'lastname', 'email']
            }],
            offset,
            limit
        });
        return {
            statusCode: 200,
            products,
            page,
            limit,
            total: size,
            pages: totalPages,
            lastPage,
            nextPage
        }
    } catch (error) {
        console.error('Failed to get products deleted: ', error);
        return { statusCode: 500, message: 'Failed to get products deleted' };
    }
}

export const getByIdServ = async(req) => {
    try {
        const { params, method, originalUrl, userId } = req;

        const { id } = params;
        const product = await Product.findOne({
            paranoid: true,
            where: {
                id
            },
            attributes: { exclude: ['public_id', 'deletedAt', 'createdAt', 'updatedAt', 'userId', 'categoryId', 'providerId'] },
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: Category,
                as: 'category',
                attributes: ['name']
            }, {
                model: Provider,
                as: 'provider',
                attributes: ['name', 'address', 'city', 'state']
            }, {
                model: User,
                as: 'user',
                attributes: ['name', 'lastname', 'email']
            }]
        });
        if (product != null) {
            await logger(`Product with id: ${id} was successfully searched!`, method, originalUrl, userId);

            return {
                statusCode: 200,
                product
            }
        } else {
            await logger(`Product with id: ${id} was not found!`, method, originalUrl, userId);
            return { statusCode: 404, message: 'Product not found' };
        }
    } catch (error) {
        console.error('Failed to get product: ', error);
        return { statusCode: 500, message: 'Failed to get product' };
    }
}

export const createServ = async(req) => {
    const { body, method, files, originalUrl, userId } = req;
    const { name, description, stock, price, categoryId, providerId } = body;
    const { imageFile } = files;
    try {
        const img_path = imageFile.path;
        let name_img = img_path.split("/");
        console.log(`Nombre separado: ${name_img}`);
        let portada_name = name_img[2];
        let filename = `${~~(Math.random() * 9999)}-${createSlug(name)}`
        let splitName = name_img[2].split('.');
        let ext = splitName[1];

        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'webp' && ext !== 'avif' && ext !== 'gif' && ext !== 'bmp' && ext !== 'svg') {
            await logger(`Files not supported by the server. You are sending a file with this extension: ${ext}`, method, originalUrl, userId);
            deleteImageStorage('products', portada_name);
            return {
                statusCode: 400,
                message: `Files not supported by the server. The files must be in the format: BMP, GIF, JPG, JPEG, PNG, SVG, WEBP, AVIF. You are sending a file with this extension: ${ext.toUpperCase()}`
            };
        }

        const uploadImg = await cloudinary.uploader.upload(img_path, {
            upload_preset: 'trycatch',
            resource_type: "auto",
            folder: 'trycatch/products',
            public_id: `${filename}`,
        });

        deleteImageStorage('products', portada_name);


        const product = await Product.create({
            name,
            description,
            stock,
            price,
            image: uploadImg.secure_url,
            public_id: uploadImg.public_id,
            categoryId,
            providerId,
            userId
        });
        if (product) {
            await logger(`Product created successfully!`, method, originalUrl, userId);
            return { statusCode: 201, message: "Product created successfully!" };
        } else {
            await logger(`Failed to create product`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to create product' };
        }
    } catch (error) {
        console.error('Internal Server, failed to create product: ', error);
        return { statusCode: 500, message: 'Internal Server, failed to create product' };
    }
}

export const updateServ = async(req) => {
    const { params, body, method, files, originalUrl, userId } = req;
    const { id } = params;
    const { name, description, stock, price, categoryId, providerId } = body;
    const { imageFile } = files;
    try {

        const product = await Product.findByPk(id);
        if (!product) return { statusCode: 404, message: 'Product not found' };

        if (product.public_id !== null) {
            await cloudinary.uploader.destroy(product.public_id);
        }

        const img_path = imageFile.path;
        let name_img = img_path.split("/");
        let portada_name = name_img[2];
        let filename = `${~~(Math.random() * 9999)}-${createSlug(name)}`;
        let splitName = name_img[2].split('.');
        let ext = splitName[1];

        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'webp' && ext !== 'avif' && ext !== 'gif' && ext !== 'bmp' && ext !== 'svg') {
            await logger(`Files not supported by the server. You are sending a file with this extension: ${ext}`, method, originalUrl, userId);
            deleteImageStorage('products', portada_name);
            return {
                statusCode: 400,
                message: `Files not supported by the server. The files must be in the format: BMP, GIF, JPG, JPEG, PNG, SVG, WEBP, AVIF. You are sending a file with this extension: ${ext.toUpperCase()}`
            };
        }

        const uploadImg = await cloudinary.uploader.upload(img_path, {
            upload_preset: 'trycatch',
            resource_type: "auto",
            folder: 'trycatch/products',
            public_id: `${filename}`,
        });

        deleteImageStorage('products', portada_name);

        const response = await Product.update({
            name,
            description,
            stock,
            price,
            image: uploadImg.secure_url,
            public_id: uploadImg.public_id,
            categoryId,
            providerId,
            userId
        }, { where: { id } });
        if (response) {
            await logger(`Product updated successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Product updated successfully!" };
        } else {
            await logger(`Failed to update product`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to update product' };
        }
    } catch (error) {
        console.error('Internal Server, failed to update product: ', error);
        return { statusCode: 500, message: 'Internal Server, failed to update product' };
    }
}

export const deleteServ = async(req) => {
    const { params, method, originalUrl, userId } = req;
    const { id } = params;
    try {
        const product = await Product.destroy({ where: { id } });
        if (product) {
            await logger(`Product deleted successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Product deleted successfully!" };
        } else {
            await logger(`Failed to delete product`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to delete product' };
        }
    } catch (error) {
        console.error('Internal server, failed to delete product: ', error);
        return { statusCode: 500, message: 'Internal server, failed to delete product' };
    }
}

export const restoreServ = async(req) => {
    const { params, method, originalUrl, userId } = req;
    const { id } = params;
    try {
        const product = await Product.restore({ where: { id } });
        if (product) {
            await logger(`Product restored successfully!`, method, originalUrl, userId)
            return { statusCode: 200, message: "Product restored successfully!" };
        } else {
            await logger(`Failed to restore product`, method, originalUrl, userId);
            return { statusCode: 400, message: 'Failed to restore product' };
        }
    } catch (error) {
        console.error('Internal server, failed to restore product: ', error);
        return { statusCode: 500, message: 'Internal server, failed to restore product' };
    }
}

function createSlug(text) {
    const normalizedText = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    return normalizedText
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .substring(0, 100);
}