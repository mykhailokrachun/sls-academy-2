const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveAsyncReadLine = () => {
  rl.question(
    'Hello. Enter 10 words or digits dividing them in spaces: ',
    (answer) => {
      const result = answer.split(' ');
      const onlyNumbers = result.filter(Number);
      const onlyWords = result.filter((item) => !onlyNumbers.includes(item));
      rl.setPrompt(`
How would you like to sort values:
1. Words by name (form A to Z).
2. Show digits from the smallest.
3. Show digits from the biggest.
4. Words by quantity of letters.
5. Only unique words.
6. Only unique values from words and numbers.
Select (1 - 6) and press ENTER: `);
      rl.prompt();
      rl.on('line', (secondAnswer) => {
        if (secondAnswer.toLowerCase() === 'exit') {
          return rl.close();
        } else if (Number(secondAnswer) === 1) {
          console.log(onlyWords.sort());
          recursiveAsyncReadLine();
        } else if (Number(secondAnswer) === 2) {
          console.log(onlyNumbers.sort((a, b) => a - b));
          recursiveAsyncReadLine();
        } else if (Number(secondAnswer) === 3) {
          console.log(onlyNumbers.sort((a, b) => b - a));
          recursiveAsyncReadLine();
        } else if (Number(secondAnswer) === 4) {
          console.log(onlyWords.sort((a, b) => a.length - b.length));
          recursiveAsyncReadLine();
        } else if (Number(secondAnswer) === 5) {
          console.log([...new Set(onlyWords)]);
          recursiveAsyncReadLine();
        } else if (Number(secondAnswer) === 6) {
          console.log([...new Set(result)]);
          recursiveAsyncReadLine();
        }
      });
    }
  );
};

recursiveAsyncReadLine();
