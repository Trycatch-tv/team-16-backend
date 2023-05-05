import * as categoriasServices from "../services/categorias.services.js";

//Controlador que llama al servicio para obtener todas las categorias de la base de datos

export const getCategorias = (req, res) => {
  categoriasServices
    .getCategorias()
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//Controlador que llama al servicio para obtener una categoriá almacenada en la base de datos deacuerdo a un id dado

export const getCategoria = (req, res) => {
  const { id } = req.params;
  categoriasServices
    .getCategoria(id)
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//Controlador que llama al servicio para crear una categoria y almacenarla en la base de datos

export const createCategorias = (req, res) => {
  const categoria = req.body;
  categoriasServices
    .createCategorias(categoria)
    .then(() => {
      res.status(201).json({
        message: "categoria created successfully...",
        data: categoria,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//Controlador que llama al servicio que actualiza una categoría en la base de datos deacuerdo a un id dado

export const updateCategorias = (req, res) => {
  const categoria = req.body;
  const { id } = req.params;
  categoriasServices
    .updateCategorias(id, categoria)
    .then(() => {
      res.status(201).json({
        message: "categoria updated successfully...",
        data: categoria,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};


//Controlador que llama al servicio que elimina una categoría en la base de datos deacuerdo a un id dado
export const deleteCategorias = (req, res) => {
  const { id } = req.params;
  categoriasServices
    .deleteCategorias(id)
    .then(() => {
      res.status(200).json({
        message: "categoria deleted successfully...",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
