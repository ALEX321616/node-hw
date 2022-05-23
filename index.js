const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {
        console.log(`Contact with id:"${id}" not found`);
      }
      console.table(contact);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      if (!deletedContact) {
        console.log(`Contact with id:"${id}" was not deleted`);
      }
      console.log(`Contact deleted : `);
      console.table(deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
