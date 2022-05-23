const { nanoid } = require("nanoid");
const fs = require(`fs`);
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch {
    console.log("NO DATA IN FILE :");
    return [];
  }
}

async function getContactById(contactId) {
  const data = await listContacts();
  if (data.length === 0) {
    return;
  }
  return data.find((el) => el.id === String(contactId));
}

async function removeContact(contactId) {
  const data = await listContacts();
  if (data.length === 0) {
    return [];
  }
  const deleteContact = await getContactById(contactId);
  if (!deleteContact) {
    console.log(`Contact with id: ${contactId} does not exist`);
    return null;
  }

  const newContacts = data.filter((el) => String(el.id) !== String(contactId));
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (err) {
    console.log(`Write error: ${err}`);
  }
  return deleteContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const addedContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(addedContact);
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(data));
    console.log(`NEW CONTACTS :`);
    console.table(addedContact);
    console.log(`NEW DATA FILE`);
    console.table(data);
  } catch (err) {
    console.log(`Contact no add! Write error: ${err}`);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
