const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.log("listContacts error:", err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
  } catch (err) {
    console.log("getContactById error:", err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contact removed`);
  } catch (err) {
    console.log("removeContact error:", err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    const newContactId = v4().replace(/-/g, "").substring(0, 20);
    const newContact = { id: newContactId, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`New contact added`);
  } catch (err) {
    console.log("addContact error:", err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
