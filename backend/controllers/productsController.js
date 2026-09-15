const db = require("../db")

exports.getAllProducts = async (req, res, next) => {
    try {
        const [products] = await db.query('SELECT * from PRODUCTS')
        if (products.length === 0) {
            return res.json({
                success: true,
                message: 'No products found',
                products: []
            });
        } else {
            res.json({ success: true, products })
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
exports.getProduct = async (req, res, next) => {
    try {
        const [product] = await db.query('SELECT * from PRODUCTS WHERE id = ?', [req.params.id])
        if (product.length === 0) {
            return res.json({
                success: true,
                message: 'No products found',
                products: []
            });
        } else {
            res.json({ success: true, product })
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

exports.getCart = async (req, res, next) => {
    try {
       
    } catch (error) {
        
    }
}