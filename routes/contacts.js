const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// GET routes for contacts
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);

// POST route to create a new contact
router.post('/', contactsController.createContact);

// PUT route to update a contact
router.put('/:id', contactsController.updateContact);

// DELETE route to remove a contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;