const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contacts = require("./db");


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getAll":
      const allContacts = await contacts.getAll();
      console.log(allContacts);
      break;
    case "getById":
      const oneContact = await contacts.getById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contacts.add({ name, email, phone });
      console.log(newContact);
      break;
    case "updateById":
      const updateContact = await contacts.updateById(id, { name, email });
      console.log(updateContact);
      break;
    case "removeById":
      const removeContact = await contacts.removeById(id);
      console.log(removeContact);
      break;
  }
};

// console.log(process.argv);

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({action})
// };

const arr = hideBin(process.argv);
// console.log(arr);

const { argv } = yargs(arr);
// console.log(argv);

invokeAction(argv);