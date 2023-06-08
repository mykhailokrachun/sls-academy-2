const axios = require('axios');
const urls = require('./urls');

let count = 0;

const request = async (url) => {
  try {
    const resp = await axios.get(url);
    return {
      status: resp.status,
      url: resp.config.url,
      data: resp.data,
    };
  } catch (error) {
    count++;
    if (count > 2) {
      count = 0;
      return;
    }
    await request(url);
  }
};

const main = async () => {
  let response = [];
  urls.map((url) => {
    response.push(request(url));
  });
  response = await Promise.all(response);
  const booleanCount = { true: 0, false: 0 };
  const final = [];
  response.map((item, index) => {
    if (item === undefined) {
      final.push(`[Fail] ${urls[index]}: The endpoint is unavailable\n`);
      return;
    }
    let isDone;
    if (
      item.data.isDone === false ||
      item.data.location.isDone === false ||
      item.data.higherEducation?.isDone === false
    ) {
      isDone = false;
      booleanCount.false++;
    } else if (
      item.data.isDone === true ||
      item.data.location.isDone === true ||
      item.data.higherEducation?.isDone === true
    ) {
      isDone = true;
      booleanCount.true++;
    }
    final.push(`[Success] ${item.url}: isDone - ${isDone}\n`);
  });

  final.push(
    `\nFound True values: ${booleanCount.true}\nFound False values: ${booleanCount.false}`
  );
  console.log(final.join(''));
};
main();
