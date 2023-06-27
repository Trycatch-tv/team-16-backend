
import { uploadImage, deleteImage } from "../config/cloudinary.js";
import Products from "../models/Products.js";
import { imageToDelete } from "../config/util.js";

const folder = "products"

export const getProducts = async (page) => {
    //localhost:3000/api/products/?page=1
    const pageSize = process.env.PAGE_SIZE;
    const size = await Products.count();
    const totalPages = Math.ceil(size / pageSize);
    return new Promise(
        (resolve, reject) => {
            if (totalPages >= page) {
                Products.findAll({
                    limit: pageSize,
                    offset: (page - 1) * pageSize
                })
                    .then(async data => {
                        resolve(
                            {
                                total: size,
                                page: page,
                                pages: totalPages,
                                products: data
                            }
                        );
                    }).catch(err => {
                        reject(err);
                    });
            } else {
                resolve({
                    message: "non parameter page"
                });
            }
        }
    );
};


export const getProductById = (id) => {
    return new Promise(
        (resolve, reject) => {
            Products.findByPk(id)
                .then(
                    data => {
                        if (data) {
                            resolve(data);
                        } else {
                            resolve({ message: "product not found" });
                        }
                    }
                )
                .catch(err => {
                    reject(err);
                });
        }
    );
}

export const deleteProduct = async (id) => {
    const productSelected = await Products.findByPk(id);
    if (productSelected) {
        const public_id = productSelected.public_id;
        return new Promise(
            (resolve, reject) => {
                Products.destroy(
                    {
                        where: {
                            id
                        }
                    }
                )
                    .then(
                        async data => {
                            await deleteImage(public_id);
                            resolve(
                                {
                                    "message": "Product deleted"
                                });
                        }
                    )
                    .catch(
                        err => {
                            reject(err);
                        }
                    );
            }
        );
    } else {
        return {
            "message": "product to delete not found"
        }
    }
}


export const createProduct = async (product) => {
    const { name, description, stock, price, image, users_id, categories_id, suppliers_id } = product;
    const imageSelected = image;
    const cloudinaryUpload = await uploadImage(image, folder);
    return new Promise(
        (resolve, reject) => {
            Products.create({
                name,
                description,
                stock,
                price,
                image: cloudinaryUpload.secure_url,
                public_id: cloudinaryUpload.public_id,
                users_id,
                categories_id,
                suppliers_id
            })
                .then(
                    data => {
                        let message;
                        if (data) {
                            message = "Product created"
                        }
                        else {
                            message = "Product fail create"
                        }
                        imageToDelete(imageSelected);
                        resolve(
                            {
                                message: message
                            }
                        );
                    })
                .catch(
                    err => {
                        reject(err);
                    }
                );
        }

    );
}

export const updateProduct = async (id, product) => {
    const productSelected = await Products.findByPk(id, { raw: true });
    const { name, description, stock, price, image, users_id, categories_id, suppliers_id } = product;
    const imageSelected = image;
    const cloudinaryUpload = await uploadImage(image, folder);
    let message;
    if (productSelected) {
        const public_idToRemove = productSelected.public_id;
        message = "Product updated";
        return new Promise(
            (resolve, reject) => {
                Products.update(
                    {
                        name,
                        description,
                        stock,
                        price,
                        image: cloudinaryUpload.secure_url,
                        public_id: cloudinaryUpload.public_id,
                        users_id,
                        categories_id,
                        suppliers_id
                    },
                    { where: { id: id } }
                )
                    .then(
                        async () => {
                            await deleteImage(public_idToRemove);
                            imageToDelete(imageSelected);
                            resolve(
                                { message: message }
                            );
                        }
                    )
                    .catch(
                        err => {
                            reject({ "error": "product fail to updated" });
                        }
                    );
            }
        );
    } else {
        message = "product not found";
        return new Promise(
            (resolve, reject) => {
                resolve({
                    message: message
                });
            }
        )
    }
}