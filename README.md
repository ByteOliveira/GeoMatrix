# Geographic Matrix
GeoMatrix represents a geographic map for node.js with enhanced point clustering and "nearby" points distance calculation.

## Installation

    npm install GeoMatrix

## Usage

    var geomatrix= require("GeoMatrix");
    location=geomatrix.createLocation(40.689604, -74.04455);
    point = geomatrix.createPoint(456982347,location,{"name":"Statue of Liberty"});
    geomatrix.addPoint(point);
    
## Constructor options
    
No constructor options yet available, but in the future will be possible to the determinate the number of degrees that each cell will take.

Now the default option is 1 degree.

## Methods

* `.getCellOfLoc(location)`     : Returns the Cell ID for a location (GPS coords).
* `.getCellOfPoint(point)`       : Return the Cell ID for a point (Obj in the "map").
* `.getCellsArround(cell_id)`    : Return a array of cells around a specific cell.
* `.getDistToPointsInCells(cells, point, max)` : Returns a array of points and their distance to a point.
* `.getDistToPoints(points, point, max)` : returns a array of points and their distance to a point.
* `.createLocation(lat,lon)`    : Returns a location.
* `.createPoint(id,loc,obj)`    : Returns a new point.
* `.addPoint(point)`    : Adds point to the "map". 
* `.getPoint(point_id)` : Gets point data from the "map".
* `.deletePoint(point_id)` : Deletes point from the map.
* `.updatePoint(point)` : Updates point in the "map".

# Credits
This library is developted on top of the [GeoPoint](https://www.npmjs.com/package/geopoint), by [davidwood](https://github.com/davidwood)
