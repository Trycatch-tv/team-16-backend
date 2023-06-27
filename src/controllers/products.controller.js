
import * as productsServices from "../services/products.services.js"

export const getProducts = (request, response) => {
    const page = request.query.page;

    productsServices.getProducts(page)
        .then(result => {
            response.status(200).json(result);
        }).catch(err => {
            response.status(500).send(err);
        });
};

export const getProductById = (request, response) => {

    const { id } = request.params;
    productsServices.getProductById(id)
        .then(
            (result) => {
                response.status(200).json(result);
            }
        )
        .catch(
            err => {
                response.status(500).send(err);
            }
        );
}

export const deleteProduct = (request, response) => {
    const { id } = request.params;
    productsServices.deleteProduct(id)
        .then(
            result => {
                response.status(200).json(result);
            }
        )
        .catch(
            err => {
                response.status(500).send(err);
            });
}

export const createProduct = (request, response) => {
    const { name, description, stock, price, users_id, categories_id, suppliers_id } = request.body;
    if (!request.file) {
        return response.status(400).json({ error: 'Image not found' });
    }
    const { path: image } = request.file;
    productsServices.createProduct({
        name,
        description,
        stock,
        price,
        image,
        users_id,
        categories_id,
        suppliers_id
    })
        .then(
            result => {
                response.status(200).json(result);
            }
        )
        .catch(
            err => {
                response.status(500).send(err);
            }
        );

};



export const updateProduct = (request, response) => {
    const { id } = request.params;
    const { name, description, stock, price, users_id, categories_id, suppliers_id } = request.body;

    if (!request.file) {
        return response.status(500).send({ error: 'Image not found' });
    }
    const { path: image } = request.file;

    productsServices.updateProduct(id,
        {
            name,
            description,
            stock,
            price,
            image,
            users_id,
            categories_id,
            suppliers_id
        })
        .then(
            result => {
                response.status(200).json(result);
            }
        )
        .catch(
            error => {
                response.status(500).send(error);
            }
        );


}



