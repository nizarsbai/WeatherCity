import { LightningElement, track } from 'lwc';

export default class WeatherApp extends LightningElement {
    @track selectedCity;
    @track weather;
    handleCityChange(event) {
        this.selectedCity = event.detail.value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.selectedCity}&appid=0674d3352d4848ae8342f4b2e876215a&units=imperial`)
            .then(response => response.json())
            .then(data => {
                this.weather = data;
            })
            .catch(error => {
                console.error('Error retrieving weather data', error);
                this.weather = null;
            });
    }
}