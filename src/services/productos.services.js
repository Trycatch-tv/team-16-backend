import db from "../config/db.js";

//Servicio que devuelve todos los productos almacenados en la base de datos

export const getProductos = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM producto";
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Servicio que devuelve un producto almacenado en la base de dadtos de acuerdo a su id

export const getProducto = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM producto WHERE id_producto=?";
    db.execute(query,[id])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Servicio que crea y almacena un producto en la base de datos

export const createProductos = (producto) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO producto (cod_producto,nombre,descripcion,imagen,stock,precio,id_categoria) VALUES (?,?,?,?,?,?,?)";
    const { cod_producto,nombre,descripcion,imagen,stock,precio,id_categoria} = producto;
    db.execute(query, [cod_producto,nombre,descripcion,imagen,stock,precio,id_categoria])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Servicio que actualiza un producto de acuerdo a un id dato

export const updateProductos = (id,producto) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE producto SET cod_producto=?, nombre=?, descripcion=?, imagen=?, stock=?, precio=?, id_categoria=? WHERE id_producto=?";
    const { cod_producto,nombre,descripcion,imagen,stock,precio,id_categoria} = producto;
    db.execute(query, [cod_producto,nombre,descripcion,imagen,stock,precio,id_categoria,id])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


//Servicio que elimina un producto de acuerdo a un id dado

export const deleteProductos = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM producto WHERE id_producto = ?";
    db.execute(query,[id])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


