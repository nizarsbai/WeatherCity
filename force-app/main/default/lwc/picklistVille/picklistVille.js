import { LightningElement, wire } from 'lwc';
import getCities from '@salesforce/apex/CityController.getCities';

export default class PicklistVille extends LightningElement {
  billingCityOptions = [];
  //selectedCity = '';

  @wire(getCities)
  wiredAccountData({ error, data }) {
    if (data) {
      this.billingCityOptions = data.map(city => {
        return {
          label: city,
          value: city
        };
      });
    } else if (error) {
      console.error(error);
    }
  }


  handleCitySelected(event) {
    const selectedCity = event.detail.value;
    const citySelectedEvent = new CustomEvent('cityselected', { detail: { city: selectedCity } });
    this.dispatchEvent(citySelectedEvent);
  }
}