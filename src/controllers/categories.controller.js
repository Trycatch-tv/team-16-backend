import * as categoriesServices from "../services/categories.services.js";

export const getCategories = (request, response) => {
    return categoriesServices.getCategories().then(
        result => {
            response.status(200).json(result);
        }
    ).catch(err => {
        response.status(500).send(err);
    });
};

export const createCategory = (request, response) => {
    const category = request.body;
    categoriesServices.createCategory(category).
        then(
            () => {
                response.status(200).json(
                    {
                        data: category
                    }
                );
            }
        ).catch(err => {
            response.status(500).send(err);
        });
};

export const deleteCategory = (request, response) => {
    const {id} = request.params;
    categoriesServices.deleteCategory(id).
                then(
                    ()=>{
                        response.status(200).json(
                            {
                                message : "delete category successfully..."
                            }
                        );
                    }
                ).catch(
                    (err)=>{
                        response.status(500).send(err);
                    }    
                );
};

export const getCategoryById = (request, response) => {
    const { id } = request.params;
    return categoriesServices.getCategoryById(id).
        then((result) => {
            response.status(200).json(result);
        }).catch((err) => {
            response.status(500).send(err);
        });
};

export const updateCategory = (request, response) => {
    const category = request.body;
    const { id } = request.params;
    categoriesServices.updateCategory(id, category).
        then(
            () => {
                response.status(200).json(
                    {
                        data: category
                    }
                );
            }
        ).catch(err => {
            response.status(500).send(err);
        });
};