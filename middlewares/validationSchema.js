const { body } = require('express-validator');

const validationSchema = () => {
    return [     
        body('title')
            .notEmpty()
            .withMessage("title is required")
            .isLength({min: 2})
            .withMessage(" min 2 char in title"),
        body('price')
            .notEmpty()
            .withMessage("price is required")
    ]
}


module.exports = {
    validationSchema
}