import { showError, clearError } from "./ui";

const apiKey = 'fa1a2c0611774f08b1524520231804';



export const weather = (params) => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params}&days=7&aqi=no`
    
    return fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status);
            }
            clearError();
            return response.json();
        })
        .catch(err => {
            if (err.message === '400') {
                showError();
            }
            console.error(err);
        });
}   
