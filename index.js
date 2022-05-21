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
// invokeAction(argv).then().catch();
// contacts.listContacts();
// const w = () =>
// contacts.getContactById(1);
// contacts.addContact("Mango", "mango@gmail.com", "322-22-22");
// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3
