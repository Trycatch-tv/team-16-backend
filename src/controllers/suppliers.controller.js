import * as suppliersServices from "../services/suppliers.services.js"

export const getSuppliers = (request, response) => {

    return suppliersServices.getSuppliers()
        .then(
            data => {
                response.status(200).json(data);
            }
        )
        .catch(
            error => {
                response.status(500).send(error);
            }
        );
}

export const getSuppliersById = (request, response) => {
    const { id } = request.params;
    return suppliersServices.getSuppliersById(id)
        .then(result => {
            response.status(200).json(result);
        })
        .catch(err => {
            response.status(500).send(err);
        });
}

export const deleteSupplier = async (request, response) => {
    const { id } = request.params;
    return suppliersServices.deleteSupplier(id)
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
}

export const createSupplier = async (request, response) => {
    const { name, address, phone, email } = request.body;
    return suppliersServices.createSupplier(
        {
            name,
            address,
            phone,
            email
        }
    )
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
}

export const updateSupplier = (request, response) => {
    const { id } = request.params;
    const { name, address, phone, email } = request.body;
    return suppliersServices.updateSupplier(
        id,
        { name, address, phone, email }
    )
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
}