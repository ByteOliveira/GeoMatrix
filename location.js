/**
 * Created by oliveira on 23/08/16.
 */
var GeoPoint = require('geopoint');
var location = function (lat,lon) {
    this.point = new GeoPoint(lat,lon)
};

location.prototype.square = function (step) {
    return new location(this.point.latitude()+step,this.point.longitude()+step)
}

module.exports=location;