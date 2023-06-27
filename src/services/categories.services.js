
import Categories from "../models/Categories.js";

export const getCategories = async () => {
    try {
        const categories = await Categories.findAll();
        return categories;
    } catch (error) {
        throw new Error(error);
    }
};

export const createCategory = (categoria) => {
    const result = categoria;
    return new Promise((resolve, reject) => {
        Categories.create(result).
            then(data => {
                resolve(data);
            }).
            catch(error => {
                reject(error);
                console.error(error);
            });
    });
};

export const updateCategory = (id, categoria) => {
    const categorySelected = Categories.findByPk(id,{raw:true});
    const idCategory = id;
    return new Promise(
        (resolve, reject) => {
            Categories.update(categoria, { where: { id: idCategory } }).
                then(data => resolve(data)).
                catch(err => {
                    reject(err);
                    console.error(err);
                });
        }
    );
};

export const getCategoryById = (id) => {
    return new Promise(
        (resolve, reject) => {
            Categories.findByPk(id).then(
                (result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        resolve({ message: "category not found" });
                    }
                }
            ).catch(
                err => {
                    reject(err);
                });
        }
    );
}

export const deleteCategory = async (id) => {
    const categorySelected = await Categories.findByPk(id, { raw: true });
    const idCategory = id;
    if (categorySelected) {
        return new Promise(
            (resolve, reject) => {
                Categories.destroy(
                    {
                        where: { id: idCategory }
                    }
                ).then(result => {
                    resolve({ message: "category deleted" });
                }
                ).catch(err => {
                    reject(err);
                }
                );
            }
        );
    } else {
        return ({ "message": "category not found" });
    }
} 