const router   = require('express').Router();
const Response = require('../models/Response');
const auth     = require('../middleware/auth');

router.post('/', async (req, res) => {
  try { res.status(201).json(await Response.create(req.body)); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.get('/', auth, async (req, res) => {
  try { res.json(await Response.find().sort('-submittedAt')); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});
router.delete('/:id', auth, async (req, res) => {
  try { await Response.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch { res.status(500).json({ message: 'Sunucu hatası' }); }
});

module.exports = router;
