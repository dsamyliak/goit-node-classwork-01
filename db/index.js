const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = `${__dirname}/contacts.json`;

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
const getById = async (id) => {
  const contacts = await getAll();
  const contactId = String(id);
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const add = async ({ name, email, phone }) => {
  const contacts = await getAll();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateById = async (id, { name, email }) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email };
  await updateContacts(contacts);
  return contacts[index];
};

const removeById = async (id) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [newContacts] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return newContacts;
};

module.exports = { getAll, getById, add, updateById, removeById };
