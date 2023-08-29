export default class Locations {
    constructor(newStartCity, startCountry, startCityLat, startCityLong,newEndCity, endCityLatitude, endCityLongitude, endCountry, dateTravelled) {

        this.newStartCity = newStartCity;
        this.startCountry = startCountry;
        this.startCityLat = startCityLat;
        this.startCityLong = startCityLong;
        this.newEndCity = newEndCity;
        this.endCityLatitude = endCityLatitude;
        this.endCityLongitude = endCityLongitude;
        this.endCountry = endCountry;
        this.dateTravelled = dateTravelled;
    }
}