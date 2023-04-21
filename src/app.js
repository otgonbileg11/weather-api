import weatherapi from './api/api';
import { deleteData, saveData } from './utils/storage';
import {
  showLoader, hideLoader, getAllData, displayHistoryData,
} from './ui/ui';

import Weather from './weather';

const form = document.querySelector('.form');
const cityName = document.querySelector('.city-name');
const temp = document.getElementById('temperature');
const desc = document.getElementById('weather-description');
const img = document.getElementById('weather-icon').firstElementChild;
const history = document.querySelector('.history-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoader();
  const searchValue = document.querySelector('#search-input').value;
  const city = searchValue;
  try {
    const data = await weatherapi(city);
    const current = data.current.temp_c;
    const { name } = data.location;
    const { country } = data.location;
    const condition = data.current.condition.text ?? 'normal';
    const date = data.location.localtime;
    const imgUrl = data.current.condition.icon;
    const weatherData = new Weather(name, country, date, current);

    cityName.textContent = name;
    temp.textContent = current;
    desc.textContent = condition;
    img.src = imgUrl;

    saveData(name.toLowerCase(), JSON.stringify(weatherData));
    const storage = getAllData();
    history.innerHTML = displayHistoryData(storage);
    if (storage) {
      history.classList.add('history-show');
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
});

history.addEventListener('mouseover', () => {
  const btns = document.querySelectorAll('.delete');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const prev = e.currentTarget.parentElement.previousElementSibling;
      const key = prev.querySelector('h2').textContent.toLowerCase();
      deleteData(key);
      const storage = getAllData();
      history.innerHTML = displayHistoryData(storage);
    });
  });
});
