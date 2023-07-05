import Role from '../models/role.model.js';
import User from '../models/user.model.js';
import { logger } from '../services/log.services.js';

export function checkDuplicateEmail(req, res, next) {
    const { email } = req.body;
    // Email
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            logger(`Failed! Email (${user.email}) is already in use`, req.method, req.originalUrl, user.id);
            return;
        }

        next();
    });
};

export async function checkRolesExisted(req, res, next) {
    try {
        const { roles } = req.body;
        if (roles === undefined) {
            next();
            return;
        }

        const existingRoles = await Role.findAll({
            where: {
                name: roles,
            },
        });

        const existingRoleNames = existingRoles.map(role => role.dataValues.name);

        const rolesNotFound = roles.filter(role => !existingRoleNames.includes(role));

        if (rolesNotFound.length > 0) {
            return res.status(400).send({
                message: "Failed! Roles do not exist: " + rolesNotFound.join(", "),
            });
        }

        // TODO: All roles exist in the database
        // Take any additional action if necessary
        next();
    } catch (error) {
        console.error('Failed to verify roles:', error);
        res.status(500).send({
            message: "Failed to verify roles",
        });
    }
}