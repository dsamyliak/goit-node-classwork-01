//yargs
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

//commander
const { program } = require("commander");

//contacts and action
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

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({action})
// };

//yargs
// console.log(process.argv);
// const arr = hideBin(process.argv);
// console.log(arr);

// const { argv } = yargs(arr);
// console.log(argv);

// invokeAction(argv);

//commander
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-em, --email <type>")
  .option("-ph, --phone <type>");

// program.parse(process.argv); ||
program.parse();

const options = program.opts();
console.log(options);
invokeAction(options);
