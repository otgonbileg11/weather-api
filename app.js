import { weather } from "./components/api";
import { deleteData, saveData } from "./components/storage";
import { showLoader, hideLoader, displayHistoryData, getAllData } from "./components/ui";
import Weather from "./components/weather";

const form = document.querySelector('.form');
const cityName = document.querySelector('.city-name');
const temp = document.getElementById('temperature');
const desc = document.getElementById('weather-description');
const img = document.getElementById('weather-icon').firstElementChild;
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
        const condition = data.current.condition.text ?? "normal";
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
    } catch (err) {
        console.log(err);
    } finally {
        hideLoader();
    }
});

history.addEventListener('mouseover', (e) => {
    const btns = document.querySelectorAll('.delete');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prev = e.currentTarget.parentElement.previousElementSibling;
            const key = prev.querySelector('h2').textContent.toLowerCase();
            deleteData(key);
            const storage = getAllData();
            history.innerHTML = displayHistoryData(storage);
        })
    })
})




