const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// KAYIT OL (Register)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        // 1. Kullanıcı veya Email var mı kontrol et
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu kullanıcı adı veya e-posta zaten kullanımda.' });
        }

        // 2. Şifreyi hashele
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Yeni kullanıcı oluştur
        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'Kullanıcı başarıyla oluşturuldu.',
            user: {
                username: savedUser.username,
                email: savedUser.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GİRİŞ YAP (Login)
router.post('/login', async (req, res) => {
    try {
        const { loginKey, password } = req.body; // loginKey: username OR email

        // 1. Kullanıcıyı bul
        const user = await User.findOne({
            $or: [{ email: loginKey }, { username: loginKey }]
        });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }

        // 2. Şifreyi kontrol et
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Hatalı şifre.' });
        }

        // 3. Token oluştur
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Giriş başarılı.',
            token,
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
