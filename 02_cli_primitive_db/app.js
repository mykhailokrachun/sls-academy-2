import inquirer from 'inquirer';
import fs from 'fs';
import questions from './basicQuestions.js';
import databaseLogic from './databaseLogic.js';

function ask() {
  inquirer.prompt(questions).then(({ user, gender, age }) => {
    if (user === '') {
      databaseLogic();
    } else if (user) {
      let result = {};
      age ? (result = { user, gender, age }) : (result = { user, gender });
      if (fs.statSync('DB.txt').size === 0) {
        fs.writeFile('DB.txt', JSON.stringify(result), function (e) {
          if (e) {
            console.log(e);
          }
        });
        ask();
      } else {
        const jsonResult = '\r\n' + JSON.stringify(result);
        fs.appendFile('DB.txt', jsonResult, function (e) {
          if (e) {
            console.log(e);
          }
        });
        ask();
      }
    }
  });
}

ask();
