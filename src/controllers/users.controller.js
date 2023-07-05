import { changeStatusSer, getAllUsersSer, getByIdSer, getProfileSer, trashUserSer, userCreateSer, userRemoveSer, userRestoreSer, userUpdateByUserSer, userUpdateSer } from "../services/users.services.js";

export async function getProfile(req, res) {
    try {
        const profile = await getProfileSer(req.userId);
        const { statusCode, ...responseData } = profile;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await getAllUsersSer();
        const { statusCode, ...responseData } = users;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getAllTrashUsers(req, res) {
    try {
        const users = await trashUserSer();
        const { statusCode, ...responseData } = users;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getById(req, res) {
    try {
        const user = await getByIdSer(req.params);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function changeStatus(req, res) {
    try {
        const user = await changeStatusSer(req.params, req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function userUpdatebyUser(req, res) {
    try {
        const user = await userUpdateByUserSer(req.userId, req.body, req.files);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function userUpdate(req, res) {
    try {
        const user = await userUpdateSer(req.userId, req.body, req.files);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function userDelete(req, res) {
    try {
        const user = await userRemoveSer(req.userId, req.params);
        const { statusCode, message } = user;
        res.status(statusCode).json({ message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function userRestore(req, res) {
    try {
        const user = await userRestoreSer(req.userId, req.params);
        const { statusCode, message } = user;
        res.status(statusCode).json({ message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function userCreate(req, res) {
    try {
        const user = await userCreateSer(req.body);
        const { statusCode, message } = user;
        res.status(statusCode).json({ message });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}