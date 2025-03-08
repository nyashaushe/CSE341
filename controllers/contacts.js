const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = (req, res) => {
    mongodb.getDatabase().db().collection('contacts').find().toArray()
        .then(contacts => {
            res.json(contacts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'An error occurred.' });
        });
};

const getSingleContact = (req, res) => {
    const id = req.params.id;
    mongodb.getDatabase().db().collection('contacts').findOne({ _id: new ObjectId(id) })
        .then(contact => {
            if (!contact) {
                res.status(404).json({ message: 'Contact not found.' });
            } else {
                res.json(contact);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'An error occurred.' });
        });
};

const createContact = async (req, res) => {
    const contact = req.body;
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        if (result.acknowledged) {
            res.status(201).json(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating contact' });
    }
};

const updateContact = async (req, res) => {
    const id = req.params.id;
    const contact = req.body;
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').replaceOne(
            { _id: new ObjectId(id) },
            contact
        );
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating contact' });
    }
};

const deleteContact = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting contact' });
    }
};


module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};