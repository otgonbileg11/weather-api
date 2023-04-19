import { weather } from "./api";
import { deleteData, saveData } from "./storage";
import { showLoader, hideLoader, displayHistoryData, getAllData } from "./ui";
import Weather from "./weather";

const form = document.querySelector('.form');
const cityName = document.querySelector('.city-name');
const temp = document.querySelector('#temperature');
const desc = document.querySelector('#weather-description');
const img = document.querySelector('#weather-icon').firstElementChild;
const history = document.querySelector('.history-container');

form.addEventListener('submit',async function(e) {
    e.preventDefault();
    showLoader();
    const searchValue = document.querySelector('#search-input').value;
    let city = searchValue;
    try {
        const data = await weather(city);
        const current = data.current.temp_c;
        const name = data.location.name;
        const country = data.location.country;
        const condition = data.current.condition.text;
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
        if(storage) {
            history.classList.add('history-show');
        }
        hideLoader();
    } catch (err) {
        hideLoader();
        console.log(err);
    }
});


history.addEventListener('mouseover', (e) => {
    const btns = document.querySelectorAll('.delete');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prev = e.currentTarget.parentElement.previousElementSibling;
            const key = prev.querySelector('h2').textContent.toLowerCase();
            localStorage.removeItem(key);
            const storage = getAllData();
            history.innerHTML = displayHistoryData(storage);
        })
    })
})




