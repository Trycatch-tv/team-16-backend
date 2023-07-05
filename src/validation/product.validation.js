import { body } from 'express-validator';
import validateResult from '../helpers/validate.helpers.js';


export const validateProduct = [
    body("name")
    .notEmpty().withMessage("The name field is required")
    .isLength({ min: 5 }).withMessage("Name min 5 character"),
    body("description")
    .notEmpty().withMessage("The description field is required")
    .isLength({ min: 5 }).withMessage("Description min 5 character"),
    body("stock")
    .isInt({ min: 0 }).withMessage("Stock must to be integer than zero"),
    body("price")
    .notEmpty().withMessage("The price field is required")
    .isFloat({ min: 0 }).withMessage("Price must to be float than zero"),
    body("categoryId")
    .notEmpty().withMessage("The category field is required")
    .isNumeric().withMessage("Category must to be numeric"),
    body("providerId")
    .notEmpty().withMessage("The provider field is required")
    .isNumeric().withMessage("Provider must to be numeric"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];