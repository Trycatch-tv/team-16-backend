
import { check, validationResult } from "express-validator";

export const validateCategory = [
    check("name")
        .exists().withMessage("name not found")
        .not().isEmpty().withMessage("name must to be filled")
        .isLength({ min: 5 }).withMessage("name min 5 characters"),
    check("description")
        .exists().withMessage("description not found")
        .not().isEmpty().withMessage("description must to be filled")
        .isLength({ min: 8 }).withMessage("description min 8 characters"),
    check("users_id")
        .exists().withMessage("users_id not found")
        .isNumeric().withMessage("users_id must to be numeric"),
    (request, response, next) => {
        try {
            validationResult(request).throw();
            return next();
        } catch (error) {
            const errorMessages = error.array().map(err => err.msg);
            return response.status(400).json({ errors: errorMessages });
        }
    }
];

export default validateCategory;