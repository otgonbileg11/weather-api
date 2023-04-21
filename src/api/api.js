import { showError, clearError } from '../ui/ui';

function weatherapi(params) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params}&days=7&aqi=no`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      clearError();
      return response.json();
    })
    .catch((err) => {
      showError(err.code);
    });
}

export default weatherapi;
