/**
 * Created by oliveira on 23/08/16.
 */
var matrix = require("./matrix");
var location= require("./location");
var point =require("./point");

/**
 * 
 * @constructor singleton
 */

var Global=function global () {
    this.m = new matrix(1);
    
    this.points={};

    /**
     * Returns the Cell ID for a location (GPS coords)
     * 
     * @param loc {location}  
     * @return cell_id {Number}
     * 
     */
    
    this.getCellOfLoc = function (loc) {
        return this.m.getCellOfLoc(loc);
    };

    /**
     * Return the Cell ID for a point (Obj in the "map")
     * 
     * @param point {point}
     * @return cell_id {Number}
     * 
     */

    this.getCellOfPoint=function (point) {
        return this.m.getCellOfPoint(point);
    };

    /**
     * Return the cells arround a specific cell
     * 
     * @param cid {Number}
     * @return cells {[cell]} returns a array of cells
     * 
     */

    this.getCellsArround=function (cid) {
        return this.m.getCells(cid);
    };

    /**
     * returns a array of points and their distance to a point
     * 
     * @param cells {[cell]} array of cells
     * @param point {point} point to calculate the distance to
     * @param max {Number} number of km of max distance
     * @return dist {point:Number} return a dic with the points and their distance
     */
    
    this.getDistToPointsInCells=function (cells, point, max) {
        return this.m.disToPoints(cells,point,max);
    };

    /**
     * returns a array of points and their distance to a point
     *
     * @param points {[point]} array of points
     * @param point {point} point to calculate the distance to
     * @param max {Number} number of km of max distance
     * @return dist {point:Number} return a dic with the points and their distance
     */

    this.getDistToPoints=function (points, point, max) {
        return this.m.disToPoint(points,point,max);
    };

    /**
     * returns a location
     * 
     * @param lat {Number} latitude
     * @param lon {Number} longitude
     * @return location {location} location
     */
    
    this.createLocation=function (lat, lon) {
        return new location(lat,lon);
    };
    /**
     * Returns a new point
     *
     * @param id {Number} unique id of point
     * @param loc {location} location
     * @param obj {Object} user defined object type
     * @return point {point} point
     */
    
    this.createPoint=function (id, loc, obj) {
        return new point(id,loc,obj);
    };

    /**
     * add point to the "map"
     * 
     * @param point {point} 
     */
    
    this.addPoint=function (point) {
        this.m.m[point.cell_id].push(point);
        this.points[point.uid]=point;
    };

    /**
     * gets point data from the "map"
     * 
     * @param point_id {Number} the unique point id
     * @return point {point}
     */
    this.getPoint=function (point_id) {
        return this.points[point_id];
    };

    /**
     * deletes point from the map
     * @param point_id {Number} the unique point id
     */
    
    this.deletePoint=function (point_id) {
        po=this.points[point_id];
        delete this.points[point_id];

        i=this.m.m[po.cell_id].indexOf(po);
        if (i>-1){
            this.m.m[po.cell_id].splice(i,1);
        }
    };

    /**
     * updates point in the "map"
     * @param point
     */

    this.updatePoint=function (point) {
        this.deletePoint(point.uid);
        point.cell_id = this.m.getCellOfLoc(point.location);
        this.addPoint(point);
    }
};

Global.instance=null;

Global.getInstance=function () {
    if (this.instance==null){
        this.instance=new Global();
    }
    return this.instance;
};

module.exports= Global.getInstance();
