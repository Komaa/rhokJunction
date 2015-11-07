var Flight = require('../models/flight');
var Seat = require('../models/userflight');
var express = require('express');
var nodemailer = require('nodemailer');
var extend = require('util')._extend;
var router = express.Router();

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

//get all the events related to a user
router.route('/getflight').get(function(req, res) {
  Flight.findOne({ departure: req.query.departure, destination: req.query.destination, date: req.query.date},function(err, flights) {
    //console.log(flights);
    if (err) {
      return res.send(err);
    }
    flights.map=[];
    for(i=0;i<flights.number_rows;i++)
    flights.map.push('aa_aaaaa_aa');
    console.log(flights);
    Seat.find({id_flight: flights._id}, function(err, seats) {
    //seats.each (function (error, seat){
      for(i=0; i< seats.length; i++) {

        flights.occupied.push(seats[i].seat.row + "_" + seats[i].seat.column) //['1_2','2_1', '2_2', '4_1','7_1','7_2']
        if(seats[i].seat.column<3)
          seats[i].seat.column-=1;
        else if(seats[i].seat.column>7)
          seats[i].seat.column+=1;
            flights.map[seats[i].seat.row]=flights.map[seats[i].seat.row].replaceAt(seats[i].seat.column,seats[i].preference);
    }
      //});

    res.json(flights);
    });
  });
});

router.route('/insertflight').post(function(req, res) {
    var flight = new Flight();
    flight.departure=req.body.departure;
    flight.destination=req.body.destination;
    flight.date=req.body.date;
    flight.departure_time=req.body.departure_time;
    flight.schema_seat=req.body.schema_seat;
    flight.number_rows= req.body.number_rows;
    flight.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.send('Flight Added');
    });
});




module.exports = router;
