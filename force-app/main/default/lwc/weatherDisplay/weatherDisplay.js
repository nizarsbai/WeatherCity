import { LightningElement, api, wire } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherController.getWeatherInfo';

export default class WeatherInfo extends LightningElement {
    @api selectedCity = 'No City Selected';
    weatherData = {};


    connectedCallback() {
        this.addEventListener('cityselected', this.handleCitySelected.bind(this));
    }

    handleCityChange(event) {
        this.cityName = event.target.value;
        if (this.cityName) {
            this.getWeatherData();
        } else {
            this.showInfo = false;
        }
    }


    handleCitySelected(event) {
        const selectedCity = event.detail.city;
        this.selectedCity = selectedCity;
        getWeatherData({ city: selectedCity })
            .then(result => {
                this.weatherData = result;
            })
            .catch(error => {
                console.error(error);
            });
    }

    getWeatherData() {
        getWeatherData({ city: this.cityName })
            .then(result => {
                if (result) {
                    this.showInfo = true;
                    this.weather = result.weather[0].main;
                    this.temperature = Math.round(result.main.temp - 273.15);
                } else {
                    this.showInfo = false;
                }
            })
            .catch(error => {
                console.error(error);
                this.showInfo = false;
            });
    }
}
