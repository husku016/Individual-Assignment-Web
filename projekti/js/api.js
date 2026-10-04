const baseURL =
  'https://media2.edu.metropolia.fi/restaurant/api/v1';

async function getRestaurants() {
  const response = await fetch(`${baseURL}/restaurants`);
  return await response.json();
}

async function getDailyMenu(id) {
  const response = await fetch(
    `${baseURL}/restaurants/daily/${id}/en`
  );
  return await response.json();
}

async function getWeeklyMenu(id) {
  const response = await fetch(
    `${baseURL}/restaurants/weekly/${id}/en`
  );
  return await response.json();
}

export {getRestaurants, getDailyMenu, getWeeklyMenu};