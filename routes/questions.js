const router   = require('express').Router();
const Question = require('../models/Question');
const auth     = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { res.json(await Question.find().populate('category').sort({ category: 1, order: 1 })); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.post('/', auth, async (req, res) => {
  try {
    const q = await Question.create(req.body);
    res.status(201).json(await q.populate('category'));
  } catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.put('/:id', auth, async (req, res) => {
  try {
    const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
    if (!q) return res.status(404).json({ message: 'Soru bulunamadı' });
    res.json(q);
  } catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.delete('/:id', auth, async (req, res) => {
  try { await Question.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});

module.exports = router;
