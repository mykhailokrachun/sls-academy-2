function formatResp(dataList) {
  const groupedData = dataList.reduce((days, row) => {
    const date = row.dt_txt.split(' ')[0];
    days[date] = [...(days[date] ? days[date] : []), row];
    return days;
  }, {});
  const result = [];
  for (const [key, value] of Object.entries(groupedData)) {
    result.push(`\nForecast for ${new Date(key).toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })}: 
${value
  .map((item) => {
    return `${item.dt_txt
      .split(' ')[1]
      .split(':')
      .slice(0, 2)
      .join(':')}, ${Math.round(
      item.main.temp - 273.15
    )}°C, feels like ${Math.round(item.main.feels_like - 273.15)}°C, ${
      item.weather[0].description
    }\n`;
  })
  .join('')}`);
  }
  return result;
}

module.exports = formatResp;
