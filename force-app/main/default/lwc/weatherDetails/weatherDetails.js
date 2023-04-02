import { LightningElement, api } from 'lwc';
import getWeatherInfo from '@salesforce/apex/WeatherController.getWeatherInfo';

const API_KEY = '0674d3352d4848ae8342f4b2e876215a';

export default class WeatherDetails extends LightningElement {
  @api selectedCity;
  weatherData = null;

  async getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    if (data.cod === 200) {
      this.weatherData = data;
    } else {
      console.error('Error fetching weather data:', data.message);
      this.weatherData = null;
    }
  }

  async connectedCallback() {
    await this.getWeatherData(this.selectedCity);
  }

  async handleCitySelect(event) {
    const selectedCity = event.detail;
    this.selectedCity = selectedCity;
    await this.getWeatherData(this.selectedCity);
  }


  getWeatherForCity(city) {
    getWeather({ city: city })
        .then(result => {
            if (result) {
                this.temperature = result.temperature;
                this.humidity = result.humidity;
                this.windSpeed = result.windSpeed;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

  
  get error() {
    return this.weatherData && this.weatherData.cod !== 200;
  }


/*
  getWeather() {
    getWeatherInfo({ city: this.selectedCity })
      .then(result => {
        this.weatherData = result;
      })
      .catch(error => {
        console.error(error);
      });
  } 
  */
}
