import { v2 as cloudinary } from 'cloudinary'

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || 'drulzi2ue'
const api_key = process.env.CLOUDINARY_API_SECRET || '862622692488564'
const api_secret = process.env.CLOUDINARY_API_SECRET || 'Dd9jEiXe9GMeK9MtHx4hp2UrLrw'
const url = process.env.CLOUDINARY_URL || 'cloudinary://862622692488564:Dd9jEiXe9GMeK9MtHx4hp2UrLrw@drulzi2ue'
const entorno = process.env.NODE_ENV || 'dev';
let configCloudinary = {} || '';

if (entorno === 'dev') {
    configCloudinary = {
        cloud_name,
        api_key,
        api_secret,
    }
}
if (entorno === 'prod') {
    configCloudinary = url
}

cloudinary.config(configCloudinary);

export async function uploadImage(path, folder) {
    return await cloudinary.uploader.upload(path, { folder: folder });
}

export async function deleteImage(public_id) {
    return await cloudinary.uploader.destroy(public_id);
}

export default cloudinary;