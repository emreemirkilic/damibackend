const router   = require('express').Router();
const Category = require('../models/Category');
const auth     = require('../middleware/auth');

router.get('/',     async (req, res) => {
  try { res.json(await Category.find().sort('order')); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.post('/', auth, async (req, res) => {
  try { res.status(201).json(await Category.create(req.body)); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.put('/:id', auth, async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cat) return res.status(404).json({ message: 'Kategori bulunamadı' });
    res.json(cat);
  } catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.delete('/:id', auth, async (req, res) => {
  try { await Category.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});

module.exports = router;
