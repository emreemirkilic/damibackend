const router = require('express').Router();
const Admin  = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '24h' });
    res.json({ token, username: admin.username });
  } catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});

const authMiddleware = require('../middleware/auth');
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.newPassword, 10);
    await Admin.findByIdAndUpdate(req.adminId, { password: hashed });
    res.json({ message: 'Şifre güncellendi' });
  } catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});

module.exports = router;
