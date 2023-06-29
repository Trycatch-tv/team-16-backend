import { check, validationResult } from "express-validator";

export const validateSupplier = [

    check("name")
        .exists().withMessage("name is required")
        .not().isEmpty().withMessage("name must to be filled")
        .isLength({ min: 5, max: 50 }).withMessage("name between 5 and 50 character"),
    check("address")
        .exists().withMessage("address is required")
        .not().isEmpty().withMessage("address must to be filled")
        .isLength({ min: 5, max: 100 }).withMessage("name between 5 and 100 character"),
    check("phone")
        .exists().withMessage("phone is required")
        .not().isEmpty().withMessage("phone must to be filled")
        .isLength({ min: 9, max: 20 }).withMessage("phone between 9 and 20 character"),
    check("email")
        .exists().withMessage("email is required")
        .normalizeEmail().isEmail().withMessage("email must to have format @"),
    (request, response, next) => {
        try {
            validationResult(request).throw();
            return next();
        } catch (error) {
            const errorMessages = error.array().map(err => err.msg);
            response.status(400).json({ errors: errorMessages });
        }
    }

];

export default validateSupplier;