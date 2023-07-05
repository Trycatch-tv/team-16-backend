import { body } from 'express-validator';
import validateResult from '../helpers/validate.helpers.js';

export const validateProvider = [
    body('name').notEmpty().withMessage('The name field is required.'),
    body('address').notEmpty().withMessage('The address field is required.'),
    body('city').notEmpty().withMessage('The city field is required.'),
    body('state').notEmpty().withMessage('The state field is required.'),
    body('zip').notEmpty().withMessage('The zip field is required.'),
    body('phone').notEmpty().withMessage('The phone field is required.')
    .isNumeric().withMessage("Phone must to be numeric")
    .isLength({ min: 9, max: 20 }).withMessage("Phone must be between 9 and 20 characters"),
    body('email')
    .notEmpty().withMessage('The email field is required..')
    .isEmail().withMessage('The email field must be a valid email address.'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]