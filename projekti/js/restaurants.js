import {getRestaurants} from './api.js';

const restaurantList = document.querySelector('.restaurant-list');

let selectedRestaurantId = null;
let metropoliaRestaurants = [];

async function showRestaurants() {
  const restaurants = await getRestaurants();

  metropoliaRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes('metropolia')
  );

  displayRestaurants(metropoliaRestaurants);

  const filterButtons = document.querySelectorAll('.filters button');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const city = button.dataset.city;

      if (city === 'all') {
        displayRestaurants(metropoliaRestaurants);
      } else {
        const filtered = metropoliaRestaurants.filter(
          (restaurant) =>
            restaurant.city.toLowerCase() === city.toLowerCase()
        );

        displayRestaurants(filtered);
      }
    });
  });
}

function displayRestaurants(restaurants) {
  restaurantList.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const article = document.createElement('article');

    article.innerHTML = `
      <h3>${restaurant.name}</h3>
      <p>Address: ${restaurant.address}</p>
      <p>City: ${restaurant.city}</p>
    `;

    article.addEventListener('click', () => {
      selectedRestaurantId = restaurant._id;

      document.querySelectorAll('.restaurant-list article').forEach((item) => {
        item.classList.remove('selected');
      });

      article.classList.add('selected');
    });

    restaurantList.appendChild(article);
  });
}

function getSelectedRestaurantId() {
  return selectedRestaurantId;
}

export {showRestaurants, getSelectedRestaurantId};