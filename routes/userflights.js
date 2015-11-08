var Seat = require('../models/userflight');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var algorithm_sezi = require('../algorithm_sezi');
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


//set a reservation
router.route('/reservation').post(function(req, res) {
  var seat = new Seat();
  seat.id_user=req.body.id_user;
  seat.id_flight=req.body.id_flight;
  seat.preference=req.body.preference;
  seat.seat.row=req.body.row;
  seat.seat.column=req.body.column;
  seat.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.send('Reservation Added');
  });
});

//set a reservation
router.route('/checkin').post(function(req, res) {
  var givenseat = new Seat();
  givenseat.id_user=req.body.id_user;
  givenseat.id_flight=req.body.id_flight;
  givenseat.preference=req.body.preference;
  var seatmap=[];
  for(var i=0;i<50;i++)
    seatmap.push('aa_aaaaa_aa');
  Seat.find({id_flight: givenseat.id_flight}, function(err, seats) {
  for(var i=0; i< seats.length; i++) {
    seatmap[seats[i].seat.row]=seatmap[seats[i].seat.row].replaceAt(seats[i].seat.column,seats[i].preference);
    }


  givenseat.seat=preprocess(seatmap,givenseat.preference);
  console.log(givenseat.seat);
  givenseat.save(function(err) {
    if (err) {
      return res.send(err);
    }
    return res.send('Checked In');
    });
  });
});

function preprocess (seatmap, preference) {
    var clusterofseat = new Map();  //<c, arrayofseat[22A,22B,22C, etc.]
    clusterofseat=createclustermap(seatmap);
    var freeseat= []; //arrayofseat[21A,21B,21C, etc.]
    freeseat=calculatefreeseat(seatmap);
    //console.log(freeseat);
    return assignseat(freeseat,clusterofseat,preference);
  }

function calculatefreeseat(seatmap){
  var freeseat= [];
  for(var i=0;i<seatmap.length;i++){
    for(var j=0;j<seatmap[i].length;j++){
      var seat= {};
      if(seatmap[i][j] !== '_' && seatmap[i][j] !== '/0'){
        if(seatmap[i][j] === 'a'){
          seat.row=i;
          seat.column=j;
          freeseat.push(seat);
        }
      }
    }
  }
  return freeseat;
}

function createclustermap(seatmap){
  var clusterofseat = new Map();

  var col;

  for(var i=0;i<seatmap.length;i++){
    for(var j=0;j<seatmap[i].length;j++){//<sleepy, arrayofseat[22A,22B,22C, etc.]
      var seat= {};
      var seats=[];
      if((seatmap[i][j] !== "_") && (seatmap[i][j] !== "/0") && (seatmap[i][j] !== "a")){
        seat.row=i;
        seat.column=j;
        seats=clusterofseat.get(seatmap[i][j]);
        if(seats){
          seats.push(seat);
          //console.log(seats);
          clusterofseat.set(seatmap[i][j],seats);
        }else{
          var filfrocio=[];
          filfrocio.push(seat);
          //console.log(filfrocio);
          clusterofseat.set(seatmap[i][j],filfrocio);
        }
        }
      }
    }
    return clusterofseat;
  }


function assignseat(freeseat, clusterofseat, preference){
  var seat={};
  var existingcluster=false;
  clusterofseat.forEach(function(value, key) {
      if(key === preference){
        existingcluster=true;
        seat=grouptocluster(freeseat, value);
        console.log("hey");
        if(seat.row === -1){
          seat=calculatefarestseat(freeseat, clusterofseat);
          console.log("sdfdfsdfs");
          var seatgroup= [];
          seatgroup=clusterofseat.get(preference);
          seatgroup.push(seat);
          clusterofseat.set(preference,seatgroup);
        }
      }
    });

    if(!existingcluster){
      seat=calculatefarestseat(freeseat, clusterofseat);
      console.log("oi");
      var newseatgroup= [];
      newseatgroup.push(seat);
      clusterofseat.set(preference,newseatgroup);
    }

    return seat;
}

function grouptocluster(freeseat, seatgroup){
  var seat= {};
  var max=0, tmp;
  console.log(seatgroup);
  for(var i=0;i<freeseat.length;i++){
    tmp=closestseat(freeseat[i],seatgroup);
    if(tmp == 1){
      return freeseat[i];
    }
  }
  seat.row=-1;

  return seat;
}

function closestseat(seat,seatgroup){
  var mindist=10000,tmpdistance;
    for(var i=0;i<seatgroup.length;i++){
      tmpdistance=distancecalculator(seat,seatgroup[i]);
      console.log(tmpdistance + "=" + seat + seatgroup[i]);
      if(tmpdistance<mindist){
        mindist=tmpdistance;
      }
    }

  return mindist;
}

function calculatefarestseat(freeseat, clusterofseat){
  var max=0, tmp;
  var seattmp= {};
  for(var i=0;i<freeseat.length;i++){
    tmp=calculatemindistance(freeseat[i],clusterofseat);
    if(tmp>max){
      max=tmp;
      seattmp=freeseat[i];
    }
  }
  return seattmp;
}

function calculatemindistance(seat,clusterofseat){
  var mindist=10000,tmpdistance;
  clusterofseat.forEach(function(value, key) {
    for(var i=0;i<value.length;i++){
      tmpdistance=distancecalculator(seat,value[i]);
      if(tmpdistance<mindist)
        mindist=tmpdistance;
    }
  });
return mindist;
}

function distancecalculator(freeseat,occseat){  //22A
  var row_distance=0, column_distance=0;
  row_distance=freeseat.row - occseat.row;
  column_distance=freeseat.column - occseat.column;
  return Math.abs(row_distance + column_distance);
}


module.exports = router;
