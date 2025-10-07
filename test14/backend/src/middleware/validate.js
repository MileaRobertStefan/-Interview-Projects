const { validateItem } = require('../middleware/validators/postItemValidator');
const { log } = require('../utils/myLog');


module.exports = (req, res, next) => {

    if (req.method === 'POST') {
        if (req.url === '/api/items') {
            const { valid, error } = validateItem(req.body);
            if (!valid) {
                return res.status(400).json({ error });
            }
        }
    }

    next();
};