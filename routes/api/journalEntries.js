const express = require('express');
const router = express.Router();
const journalEntriesCtrl = require('../../controllers/api/journalEntries');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, journalEntriesCtrl.create);
router.get('/', ensureLoggedIn, journalEntriesCtrl.index);
router.get('/:id', ensureLoggedIn, journalEntriesCtrl.show);
router.put('/:id', ensureLoggedIn, journalEntriesCtrl.update);
router.delete('/:id', ensureLoggedIn, journalEntriesCtrl.delete);
router.get('/user/:userId', ensureLoggedIn, journalEntriesCtrl.getByUser);

module.exports = router;