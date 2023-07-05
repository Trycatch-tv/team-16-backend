import { createServ, deleteServ, getAllDeletedServ, getAllServ, getByIdServ, restoreServ, updateServ } from "../services/provider.services.js";

export async function getAll(req, res) {
    try {
        const page = parseInt(req.query.p) || 1; // Obtener el número de página, o utilizar 1 si no se proporciona
        const limit = parseInt(req.query.l) || parseInt(process.env.PAGE_SIZE); // Obtener el límite de elementos por página, o utilizar lo que este declarado en el .env si no se proporciona

        const data = await getAllServ(limit, page);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getAllDeleted(req, res) {
    try {
        const page = parseInt(req.query.p) || 1; // Obtener el número de página, o utilizar 1 si no se proporciona
        const limit = parseInt(req.query.l) || parseInt(process.env.PAGE_SIZE); // Obtener el límite de elementos por página, o utilizar lo que este declarado en el .env si no se proporciona

        const data = await getAllDeletedServ(limit, page);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getById(req, res) {
    try {
        const data = await getByIdServ(req);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function create(req, res) {
    try {
        const data = await createServ(req);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function update(req, res) {
    try {
        const data = await updateServ(req);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function remove(req, res) {
    try {
        const data = await deleteServ(req);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function restore(req, res) {
    try {
        const data = await restoreServ(req);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}