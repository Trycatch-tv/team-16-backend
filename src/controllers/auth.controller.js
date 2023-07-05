import { registerUser, loginUser, verifyUser, verifyTokenUser, forgotPasswordUser, recoveryPasswordUser, refreshTokenUser, reactiveUserSer, getRolesSer, gestionarRolesDeUsuarioSer, verifyNewUserSer, newPasswordUserSer } from '../services/auth.services.js';

export async function register(req, res) {
    try {
        const user = await registerUser(req.body, req.method, req.originalUrl);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export async function login(req, res) {
    try {
        // console.log(req.method);
        // console.log(req.originalUrl);
        const user = await loginUser(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function verify(req, res) {
    try {
        const user = await verifyUser(req.params['token']);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function verifyNewUser(req, res) {
    try {
        const user = await verifyNewUserSer(req.params['token']);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function verifyToken(req, res) {
    try {
        const user = await verifyTokenUser(req.params['token']);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function forgotPassword(req, res) {
    try {
        const user = await forgotPasswordUser(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function resetPassword(req, res) {
    try {
        const user = await recoveryPasswordUser(req.params, req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function newPasswordUser(req, res) {
    try {
        const user = await newPasswordUserSer(req.params, req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function refreshToken(req, res) {
    try {
        const user = await refreshTokenUser(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function reactiveUser(req, res) {
    try {
        const user = await reactiveUserSer(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function getRoles(req, res) {
    try {
        const roles = await getRolesSer();
        const { statusCode, ...responseData } = roles;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function gestionarRoles(req, res) {
    try {
        const roles = await gestionarRolesDeUsuarioSer(req.body);
        const { statusCode, ...responseData } = roles;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}