
import Suppliers from "../models/Suppliers.js";

export const getSuppliers = () => {
    return new Promise(
        (resolve, reject) => {
            Suppliers.findAll()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        }
    );
}

export const getSuppliersById = (id) => {
    return new Promise(
        (resolve, reject) => {
            Suppliers.findByPk(id)
                .then(
                    data => {
                        if (data) {
                            resolve(data);
                        } else {
                            resolve({ "message": "supplier not found" })
                        }
                    }
                )
                .catch(
                    err => {
                        reject(err);
                    }
                );
        }
    );
}

export const deleteSupplier = async (id) => {
    const supplierSelected = await Suppliers.findByPk(id, { raw: true });
    if (supplierSelected) {
        return new Promise(
            (resolve, reject) => {
                Suppliers.destroy({
                    where: {
                        id: id
                    }
                })
                    .then(
                        data => {
                            resolve({ "message": "supplier deleted" });
                        })
                    .catch(
                        err => {
                            reject(err);
                        }
                    );
            }
        );

    } else {
        return { "message": "supplier not found" }
    }
}

export const createSupplier = (supplier) => {
    const { name, address, phone, email } = supplier;
    return new Promise(
        (resolve, reject) => {
            Suppliers.create(
                {
                    name, address, phone, email
                }
            )
                .then(
                    result => {
                        let message;
                        if (result) {
                            message = "supplier created"
                        } else {
                            message = "supplier fail to create"
                        }
                        resolve(
                            {
                                "message": message
                            }
                        );
                    }
                )
                .catch(err => {
                    reject(err);
                });
        }
    );
}

export const updateSupplier = async (id, supplier) => {
    const supplierSelected = await Suppliers.findByPk(id, { raw: true });
    const { name, address, phone, email } = supplier;
    if (supplierSelected) {
        return new Promise(
            (resolve, reject) => {
                Suppliers.update(
                    { name, address, phone, email },
                    { where: { id } }
                )
                    .then(
                        result=>{
                            resolve({"message":"supplier updated"});
                        }
                    )
                    .catch(
                        err=>{
                            reject(err);
                        }
                    )
            }
        );
    } else {
        return {
            "message": "supplier not found"
        }
    }
}