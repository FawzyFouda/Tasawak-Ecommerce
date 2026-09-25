const db = require('../config/db'); // اتصالات MySQL لديك

exports.createOrder = async (req, res) => {
    const { user_id, shipping_address, phone, payment_method, items, total_amount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // استخدام Transaction لضمان حفظ الطلب وعناصره معاً أو إلغاء كل شيء عند حدوث خطأ
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();    

        // 1. أدخل الطلب الأساسي في جدول orders
        const [orderResult] = await connection.query(
            `INSERT INTO orders (user_id, total_amount, shipping_address, phone, payment_method, status) 
       VALUES (?, ?, ?, ?, ?, 'pending')`,
            [user_id || null, total_amount, shipping_address, phone, payment_method || 'COD']
        );

        const orderId = orderResult.insertId;

        // 2. تجهيز عناصر السلة لإدخالها دفعة واحدة في order_items
        const orderItemsData = items.map((item) => [
            orderId,
            item.id,
            item.quantity,
            item.discount_price || item.price,
        ]);

        await connection.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`,
            [orderItemsData]
        );

        // 3. تأكيد الـ Transaction
        await connection.commit();
        connection.release();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId: orderId,
        });
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error('Order Error:', error);
        res.status(500).json({ success: false, message: 'Failed to process order' });
    }
};