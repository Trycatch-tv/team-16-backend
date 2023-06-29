
import Categories from "../models/Categories.js";
import Users from "../models/Users.js";

export const getCategories = async () => {
    try {
        const categories = await Categories.findAll({ raw: true });
        return categories;
    } catch (error) {
        throw new Error(error);
    }
};

export const createCategory = async (category) => {
    const { name, description, users_id } = category;
    const usersSelected = await Users.findByPk(users_id, { raw: true });
    if (usersSelected) {
        return new Promise((resolve, reject) => {
            Categories.create({ name, description, users_id }).
                then(() => {
                    resolve({ message: "category created" });
                }).
                catch(error => {
                    reject(error);
                    console.error(error);
                });
        });

    } else {
        return ({ message: "users_id not found" });
    }
};

export const updateCategory = async (id, category) => {
    const { name, description, users_id } = category;
    const usersIdSelected = await Users.findByPk(users_id, { raw: true });
    const categorySelected = await Categories.findByPk(id, { raw: true });
    console.log(usersIdSelected);
    console.log(categorySelected);

    if (!usersIdSelected) {
        return ({ message: "users_id not found" });
    }
    if (!categorySelected) {
        return ({ message: "category not found" });
    }
    return new Promise(
        (resolve, reject) => {
            Categories.update({ name, description, users_id }, { where: { id } })
                .then(
                    () => resolve({ message: "category updated" })
                )
                .catch(err => {
                    reject(err);
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