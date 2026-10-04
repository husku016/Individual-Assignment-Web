import {getDailyMenu, getWeeklyMenu} from './api.js';
import {getSelectedRestaurantId} from './restaurants.js';

const dailyMenuButton = document.querySelector('#daily-menu');
const weeklyMenuButton = document.querySelector('#weekly-menu');
const menuContent = document.querySelector('#menu-content');

function setupMenu() {
  dailyMenuButton.addEventListener('click', async () => {
    const selectedRestaurantId = getSelectedRestaurantId();

    if (!selectedRestaurantId) {
      menuContent.innerHTML = '<p>Please select a restaurant first.</p>';
      return;
    }

    const data = await getDailyMenu(selectedRestaurantId);

    if (data.courses.length === 0) {
  menuContent.innerHTML = `
    <div class="menu-message">
      <h3>Today's Menu</h3>
      <p>No menu available for today.</p>
    </div>
  `;
  return;
}
    menuContent.innerHTML = '';

    data.courses.forEach((course) => {
      menuContent.innerHTML += `
        <div>
          <h3>${course.name}</h3>
          <p>Price: ${course.price}</p>
          <p>Diets: ${course.diets}</p>
        </div>
      `;
    });
  });

  weeklyMenuButton.addEventListener('click', async () => {
    const selectedRestaurantId = getSelectedRestaurantId();

    if (!selectedRestaurantId) {
      menuContent.innerHTML = '<p>Please select a restaurant first.</p>';
      return;
    }

    const data = await getWeeklyMenu(selectedRestaurantId);


    menuContent.innerHTML = '';

    data.days.forEach((day) => {
      const dayElement = document.createElement('div');

      let coursesHTML = '';

      day.courses.forEach((course) => {
        coursesHTML += `
          <p>
            <strong>${course.name}</strong><br>
            Price: ${course.price}<br>
            Diets: ${course.diets}
          </p>
        `;
      });

      dayElement.innerHTML = `
        <h3>${day.date}</h3>
        ${coursesHTML}
      `;

      menuContent.appendChild(dayElement);
    });
  });
}

export {setupMenu};