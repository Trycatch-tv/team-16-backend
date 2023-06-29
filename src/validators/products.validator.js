import { check, validationResult } from "express-validator";
import { imageToDelete } from "../config/util.js";

export const validateProduct = [
    check("name")
        .exists().withMessage("name is required")
        .not().isEmpty().withMessage("name must to be filled")
        .isLength({ min: 5 }).withMessage("name min 5 character"),
    check("description")
        .exists().withMessage("description is required")
        .not().isEmpty().withMessage("description must to be filled")
        .isLength({ min: 5 }).withMessage("description min 5 character"),
    check("stock")
        .exists().withMessage("stock is required")
        .not().isEmpty().withMessage("stock must to be filled")
        .isInt({ min: 0 }).withMessage("stock must to be integer than zero"),
    check("price")
        .exists().withMessage("price is required")
        .not().isEmpty().withMessage("price must to be filled")
        .isFloat({ min: 0 }).withMessage("price must to be float than zero"),
    check("users_id")
        .exists().withMessage("users_id is required")
        .isNumeric().withMessage("users_id must to be numeric"),
    check("categories_id")
        .exists().withMessage("categories_id is required")
        .isNumeric().withMessage("categories_id must to be numeric"),
    check("suppliers_id")
        .exists().withMessage("suppliers_id is required")
        .isNumeric().withMessage("suppliers_id must to be numeric"),
    (request, response, next) => {
        try {
            validationResult(request).throw();
            return next();
        } catch (error) {
            const { path: image } = request.file;
            imageToDelete(image);
            const errorMessages = error.array().map(err => err.msg);
            return response.status(400).json({ errors: errorMessages });
        }
    }
];

export default validateProduct;