import { body } from 'express-validator';
import validateResult from '../helpers/validate.helpers.js';

export const validateCategory = [
    body('name').notEmpty().withMessage('The name field is required.'),
    body('description').notEmpty().withMessage('The description field is required.'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]