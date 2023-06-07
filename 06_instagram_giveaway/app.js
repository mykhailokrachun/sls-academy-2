console.time('elapsedTime');
const fs = require('fs');

const uniqueValues = async () => {
  const result = new Set();
  const files = await fs.readdirSync('./2kk_words');
  await files.map((file) => {
    const data = fs.readFileSync(`./2kk_words/${file}`, 'utf-8');
    data.split('\n').map((item) => {
      result.add(item);
    });
  });
  console.log(result.size);
};

const existInAllFiles = async () => {
  const arr = [];
  const files = await fs.readdirSync('./2kk_words');
  await files.map((file) => {
    const data = fs.readFileSync(`./2kk_words/${file}`, 'utf-8');
    const localArr = [];
    data.split('\n').map((item) => {
      localArr.push(item);
    });
    arr.push(localArr);
  });

  const result = arr.reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));
  console.log(new Set(result).size);
};

const existInAtleastTen = async () => {
  const arr = [];
  const files = await fs.readdirSync('./2kk_words');
  await files.map((file) => {
    const data = fs.readFileSync(`./2kk_words/${file}`, 'utf-8');
    const localArr = [];
    data.split('\n').map((item) => {
      localArr.push(item);
    });
    arr.length < 10 && arr.push(localArr);
  });
  const result = arr.reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));
  console.log(new Set(result).size);
};

const wrapper = async () => {
  await uniqueValues();
  await existInAllFiles();
  await existInAtleastTen();
  console.timeEnd('elapsedTime');
};
wrapper();
