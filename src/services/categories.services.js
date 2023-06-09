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
    Categories.create(result)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
        console.error(error);
      });
  });
};

export const updateCategory = (id, categoria) => {
  const idCategory = id;
  console.log(categoria);
  return new Promise((resolve, reject) => {
    Categories.update(categoria, { where: { id: idCategory } })
      .then((data) => resolve(data))
      .catch((err) => {
        reject(err);
        console.error(err);
      });
  });
};

export const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    Users.findByPk(id)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteCategory = (id) => {
  const idCategory = id;
  return new Promise((resolve, reject) => {
    Categories.destroy({
      where: { id: idCategory },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
