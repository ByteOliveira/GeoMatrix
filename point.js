/**
 * Created by oliveira on 23/08/16.
 */
var location =require("./location");
var global=require("./global");

var point = function (uid,loc,obj) {
    this.uid=uid;
    this.location=loc;  
    this.cell_id=global.m.getCellOfLoc(loc);
    this.obj=obj;
};

module.exports=point;
