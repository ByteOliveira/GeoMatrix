/**
 * Created by oliveira on 23/08/16.
 */
require("./location");

var cell = function (cell_id,locin,step) {
    this.cell_id=cell_id;
    this.locin=locin;
    this.locout=locin.square(step);
    this.points=[];
};

cell.prototype.in = function (loc) {
    if (loc.point.latitude()> this.locin.point.latitude() && loc.point.latitude()< this.locout.point.latitude()){
        if (loc.point.longitude()> this.locin.point.longitude() && loc.point.longitude()< this.locout.point.longitude())
            return true;
    }
    return false;
};

module.exports=cell;