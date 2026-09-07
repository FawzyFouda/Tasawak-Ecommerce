const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. إنشاء حساب جديد (Register)
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        // استخدمنا 400 عشان بيانات المبعوته غلط او مش موجوده
        return res.status(400).json({ success: false, message: 'يرجى ملء جميع الحقول' });
    }
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'البريد الإلكتروني مستخدم بالفعل' });
        }
        // تشفير كلمة المرور
        //  عبارة عن قيمة عشوائية بتُضاف أثناء تشفير كلمة المرور.Salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        res.status(201).json({ success: true, message: 'تم إنشاء الحساب بنجاح' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. تسجيل الدخول (Login)
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'يرجى ملء جميع الحقول' });
    }
    try {
        // البحث عن المستخدم
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('users is:', users);
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'البيانات غير صحيحة' });
        }
        
        const user = users[0];
        console.log('user is:', user);
        // مراجعة كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'كلمة المرور غير صحيحة' });
        }

        // إنشاء الـ Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// جلب بيانات المستخدم الحالي
exports.getMe = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, created_at FROM users WHERE id = ?', 
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
        }

        res.json({ success: true, user: users[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};