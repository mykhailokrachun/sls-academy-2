import inquirer from 'inquirer';
import fs from 'fs';

function databaseLogic() {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'searchDB',
      message: 'Would you to search values in DB ?',
      default: true,
    })
    .then((answer) => {
      const arrDB = [];
      if (answer.searchDB) {
        fs.readFile('DB.txt', 'utf8', function (err, data) {
          if (err) throw err;
          data.split('\n').map((item) => arrDB.push(JSON.parse(item)));
          console.log(arrDB);
          inquirer
            .prompt({
              type: 'input',
              name: 'nameDB',
              message: "Enter the user's name you wanna find in DB: ",
            })
            .then((answer) => {
              const foundUser = arrDB.find(
                (item) =>
                  item.user.toLowerCase() === answer.nameDB.toLowerCase()
              );
              if (foundUser) {
                console.log(`User ${answer.nameDB} was found.`);
                console.log(foundUser);
              } else {
                console.log(`User ${answer.nameDB} does not exist.`);
              }
            });
        });
      }
    });
}

export default databaseLogic;
