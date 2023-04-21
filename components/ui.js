// const weatherContainer = document.querySelector('#weather-container');
const loader = document.querySelector('.loader');
const main = document.querySelector('main');
const weatherInfo = document.querySelector('#weather-info');
// const suggestionsList = document.querySelector('#suggestions-list');
// const searchInput = document.querySelector('#search-input');
// const historyList = document.querySelector('#history-list');

export function showLoader() {
  loader.classList.add('show');
}

export function hideLoader() {
  loader.classList.remove('show');
}

export function showError() { 
    const errorContainer = document.createElement('div');
    const icon = document.querySelector('#weather-icon');
    main.style.color = 'gray';
    icon.style.opacity = '0.5';
    errorContainer.classList.add('error');
    errorContainer.textContent = 'City or Country Not Found';
    weatherInfo.appendChild(errorContainer);
}

export function clearError() {
    const errorContainer = document.querySelector('.error');
    main.style.color = 'white';
     if (errorContainer) {
        weatherInfo.removeChild(errorContainer);
    }
}

export function getAllData() {
  const result = {};
  for(let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    result[i] = JSON.parse(value);
  }
  return result;
}

export function displayHistoryData(data) {
  let displayHistory = [];
  for(const key in data) {
    let dataObject = JSON.parse(data[key]);
    displayHistory.push(
      `<section class="weather-history">
        <div>
          <h2>${dataObject.city}</h2>
          <p>${dataObject.country}</p>
          <p>${dataObject.date}</p>
        </div>
        <div id="temperature-data">
          <div class="delete" onclick="deleteFromList()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50"><path d="M256 67.8c-102.6 0-186 83.4-186 186s83.4 186 186 186 186-83.4 186-186-83.4-186-186-186zm60.1 224.9c5.9 5.9 5.9 15.4 0 21.2-2.9 2.9-6.8 4.4-10.6 4.4s-7.7-1.5-10.6-4.4L256 275l-38.9 38.9c-2.9 2.9-6.8 4.4-10.6 4.4s-7.7-1.5-10.6-4.4c-5.9-5.9-5.9-15.4 0-21.2l38.9-38.9-38.9-38.9c-5.9-5.9-5.9-15.4 0-21.2 5.9-5.9 15.4-5.9 21.2 0l38.9 38.9 38.9-38.9c5.9-5.9 15.4-5.9 21.2 0 5.9 5.9 5.9 15.4 0 21.2l-38.9 38.9 38.9 38.9z" fill="#D14D72" class="color000 svgShape"></path></svg>
          </div>
        <span id="temperature">${dataObject.temperature}&deg;C</span>
      </section>`
    )
  }
  displayHistory = displayHistory.join("")
  return displayHistory;
}