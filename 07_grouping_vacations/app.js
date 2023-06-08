const vacationsJson = require('./vacationsOriginal.json');
const fs = require('fs');

const relData = vacationsJson.map((user) => {
  return {
    userId: user.user._id,
    userName: user.user.name,
    vacations: [],
  };
});
const uniqueUsers = relData.filter(
  (user, index, array) =>
    array.findIndex((u) => u.userId == user.userId) == index
);
const flatVacations = vacationsJson.map((item) => {
  return {
    userId: item.user._id,
    userName: item.user.name,
    startDate: item.startDate,
    endDate: item.endDate,
  };
});
flatVacations.map((item) => {
  const uniqueIndex = uniqueUsers.findIndex(
    (user) => user.userId === item.userId
  );
  uniqueUsers[uniqueIndex].vacations.push({
    startDate: item.startDate,
    endDate: item.endDate,
  });
});
fs.writeFile('vacationsReworked.json', JSON.stringify(uniqueUsers), (error) => {
  if (error) console.log(error);
});
