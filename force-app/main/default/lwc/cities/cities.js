import { LightningElement, api, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import { publishCitySelected } from 'lightning/messageService';
import WeatherController from '@salesforce/apex/WeatherController.getWeatherInfo';
//import { Interop } from '@lwc/interop';
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
//import CITY_FIELD from '@salesforce/schema/Account.City__c';

export default class Cities extends LightningElement {
    @api recordId;
    cityOptions = [];
    selectedCity = '';
    subscription = null;

    weatherController = new WeatherController();

    connectedCallback() {
        this.weatherController.getCities()
            .then(cityOptions => {
                this.cityOptions = cityOptions;
                this.selectedCity = cityOptions[0].value;
                this.publishCitySelected();
            })
            .catch(error => {
                console.error(error);
            });

        this.subscription = subscribe(
            this.messageContext,
            publishCitySelected,
            (message) => {
                this.selectedCity = message.city;
            }
        );
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
    }

    handleCityChange(event) {
        this.selectedCity = event.detail.value;
        this.publishCitySelected();
    }

    publishCitySelected() {
        const message = { city: this.selectedCity };
        publishCitySelected(this.messageContext, message);
    }
}