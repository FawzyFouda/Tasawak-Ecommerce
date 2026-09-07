const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. قراءة الـ Token من الـ Header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'غير مصرح لك بالدخول، الـ Token مفقود' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. فك تشفير الـ Token والتحقق منه
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // إضافة بيانات المستخدم المطلوبة للـ Request
        next(); // الاستمرار للـ Route الرئيسي
    } catch (error) {
        return res.status(401).json({ success: false, message: 'الـ Token غير صالح أو منتهي الصلاحية' });
    }
};