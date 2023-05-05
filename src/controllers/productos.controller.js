import * as productosServices from "../services/productos.services.js";

export const getProductos = (req, res) => {
  productosServices
    .getProductos()
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const createProductos = (req, res) => {
  const producto = req.body;
  productosServices
    .createProductos(producto)
    .then(() => {
      res.status(200).json({
        message: "producto created successfully...",
        data: producto,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteProductos = (req, res) => {
  const { id } = req.params;
  productosServices
    .deleteProductos(id)
    .then(() => {
      res.status(200).json({
        message: "producto deleted successfully...",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const updateProductos = (req, res) => {
  const producto = req.body;
  const { id } = req.params;
  productosServices
    .updateProductos(id, producto)
    .then(() => {
      res.status(200).json({
        message: "producto updated successfully...",
        data: producto,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getProducto = (req, res) => {
  const { id } = req.params;
  productosServices
    .getProducto(id)
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};