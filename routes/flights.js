var Flight = require('../models/flight');
var Seat = require('../models/userflight');
var express = require('express');
var nodemailer = require('nodemailer');
var extend = require('util')._extend;
var router = express.Router();



//get all the events related to a user
router.route('/getflight').get(function(req, res) {
  Flight.findOne({ departure: req.query.departure, destination: req.query.destination, date: req.query.date},function(err, flights) {
    console.log(flights);
    if (err) {
      return res.send(err);
    }
    flights.map=[];
    for(i=0;i<flights.number_rows;i++)
    flights.map.push('aa_aaaaa_aa');

    Seat.find({id_flight: flights._id}, function(err, seats) {
      console.log(seats);
      if(seats.length < 0) {
    seats.each (function (error, seat){
      flights.occupied.push(seat.row + "_" + seat.column) //['1_2','2_1', '2_2', '4_1','7_1','7_2']
      if(seat.column<3)
        seat.column-=1;
      else if(seat.column>7)
        seat.column+=1;
      flight.map[seat.row][seat.column]=seats.preference;

      });
    }
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
