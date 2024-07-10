const Contacts = require("../models/contactsModel");

const listContacts = async () => await Contacts.find();

const getContactById = async (id, user) => {
  try {
    return Contacts.findOne({ _id: id, owner: user.id });
  } catch (error) {
    console.error(error);
    return false;
  }
};

const addContact = ({ name, email, phone, favorite }, user) =>
  Contacts.create({ name, email, phone, favorite, owner: user.id });

const removeContact = (id, user) => {
  try {
    return Contacts.findByIdAndRemove({ _id: id, owner: user.id });
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateContact = (id, body, user) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: id, owner: user.id }, body, {
      new: true,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateStatusContact = (id, body, user) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: id, owner: user.id }, body, {
      new: true,
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
