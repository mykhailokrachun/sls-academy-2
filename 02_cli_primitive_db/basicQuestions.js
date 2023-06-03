const questions = [
  {
    type: 'input',
    name: 'user',
    message: "Enter the user's name. To cancel press ENTER: ",
  },
  {
    type: 'list',
    name: 'gender',
    message: 'Choose your Gender.',
    choices: ['male', 'female'],
    when: function (answers) {
      return answers.user;
    },
  },
  {
    type: 'input',
    name: 'age',
    message: 'Enter your age: ',
    when: function (answers) {
      return answers.user;
    },
  },
];

export default questions;
