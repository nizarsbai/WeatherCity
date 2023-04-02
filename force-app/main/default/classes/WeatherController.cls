public with sharing class WeatherController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getWeatherInfo(String city) {
        System.debug('Selected City: ' + city);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0674d3352d4848ae8342f4b2e876215a');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            return (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
        } else {
            return null;
        }
    }
}
