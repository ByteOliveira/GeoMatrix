/**
 * Created by oliveira on 23/08/16.
 */
/**
 * Created by oliveira on 09/08/16.
 */
var cell= require("./cell");
var location=require("./location");
var colors = require('colors');

var matrix= function (step) {
    var begin_lat=-90;
    var begin_lon=-180;

    this.m={};

    var counter=-90.01800;

    for(i=0;i<180/step;i++){
        //console.log("lat: "+begin_lat+" - "+((begin_lat+step)));
        for(j=0;j<360/step;j++){
            //console.log("       lon: "+begin_lon+" - "+(begin_lon+step));
            this.m[truncateDecimals(counter,4)]=new cell(truncateDecimals(counter,4),new location(begin_lat,begin_lon),step);
            step1=step;
            //l=this.m[counter].locin;
            //console.log(JSON.stringify(l));
            begin_lon=this.m[truncateDecimals(counter,4)].locout.point.longitude();
            if(begin_lon>180)
                begin_lon=180;
            counter+=0.0001;
        }
        begin_lat=this.m[truncateDecimals(counter-0.0001,4)].locout.point.latitude();
        if(begin_lat>90)
            begin_lat=90;
        begin_lon=-180;
        counter+=1;
        counter=Number((counter).toFixed(0));
        counter-=0.01800;
    }
    
    console.log("matrix incited correctly");

};

matrix.prototype.getCells=function (cid) {
    //console.log(colors.red("not tested , definely will not work"));
    return [this.m[cid-1.0001],this.m[cid-1],this.m[cid+0.0009],this.m[cid-0.0001],this.m[cid],this.m[cid+0.0001],this.m[cid+1.0001],this.m[cid+1],this.m[cid+0.0009]]
};

matrix.prototype.disToPoints=function (cells, point,max) {

    dists={};
    //console.log(JSON.stringify(cells));

    for(i=0;i<cells.length;i++) {
        if(cells[i] != null) {
            //console.log("---------> "+i+" : "+cells[i].cell_id+" : "+cells[i].users.length);
            for (j=0;j<cells[i].points.length;j++) {
                //console.log("         |---------> uid:"+cells[i].users[j].uid+" dist:" + user.location.point.distanceTo(cells[i].users[j].location.point, true));
                if (point.location.point.distanceTo(cells[i].points[j].location.point, true) < max)
                    dists[cells[i].points[j].uid] = point.location.point.distanceTo(cells[i].points[j].location.point, true);
            }
        }
    }
    return dists;
};

matrix.prototype.disToPoint=function (points, point, max) {
    dists={};
    for (j=0;j<points.length;j++) {
        if (point.location.point.distanceTo(points[j].location.point, true) < max)
            dists[points[j].uid] = point.location.point.distanceTo(points[j].location.point, true);
    }
    
    return dists;
    
};

matrix.prototype.getCellOfPoint=function (point) {
    lat = point.location.point.latitude();
    lon = point.location.point.longitude();


    cell_id = (parseFloat(Number(lat).toFixed(0))+Number(lat).toFixed(0)/10000)

    return cell_id;
};

matrix.prototype.getCellOfLoc=function (loc) {

    //console.log("nao funciona ate se corrigir o erro de truncatura");

    lat = loc.point.latitude();
    lon = loc.point.longitude();
    //console.log(Number(lat).toFixed(0)+" "+(Number(lat).toFixed(0)/10000))
    cell_id = (parseFloat(Number(lat).toFixed(0))+Number(lat).toFixed(0)/10000)
    //console.log(cell_id);
    return this.m[cell_id];
};

truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

module.exports=matrix;