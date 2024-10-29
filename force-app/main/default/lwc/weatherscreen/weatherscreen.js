import { LightningElement, track } from 'lwc';
import getWeatherDetails from '@salesforce/apex/WeatherDetailsClass.getWeatherDetails';

export default class WeatherScreen extends LightningElement {
    @track inputCityName = ''; // Track the input for city name
    @track weatherDetails = {}; // Track the weather details
    @track showWeatherDetails = false; // Control visibility of weather details

    handleInputChange(event) {
        this.inputCityName = event.detail.value; // Capture the city name from input
    }

    handleWeatherDetails() {
        getWeatherDetails({ cityName: this.inputCityName }) // Call Apex method
            .then((result) => {
                this.showWeatherDetails = true; // Show weather details if successful
                this.weatherDetails = result; // Assign result to weatherDetails
            })
            .catch((error) => {
                this.showWeatherDetails = false; // Hide weather details on error
                console.error('Error fetching weather details:', error); // Log the error
            });
        console.log('Weather details:', JSON.stringify(this.weatherDetails)); // Debug output
    }
}
