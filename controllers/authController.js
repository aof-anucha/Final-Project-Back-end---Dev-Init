// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        user.last_login = new Date();
        await user.save();
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
};

exports.test = async (req, res) => {
    res.status(201).send('test passed');

};

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้าง user_id อัตโนมัติ (เช่น นับจากจำนวนผู้ใช้ที่มีอยู่แล้ว)
        const userCount = await User.countDocuments();
        const user_id = userCount + 1;

        // สร้างผู้ใช้ใหม่
        user = new User({ user_id, username, password: hashedPassword, email });
        await user.save();

        // สร้าง JWT token
        const token = jwt.sign({ userId: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
