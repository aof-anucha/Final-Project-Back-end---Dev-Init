const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verified.userId;
        // console.log(req.userId)
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
