var Flight = require('../models/flight');
var express = require('express');
var nodemailer = require('nodemailer');
var extend = require('util')._extend;
var router = express.Router();



//get all the events related to a user
router.route('/getflight').get(function(req, res) {
  Flight.findOne({ departure: req.body.departure, destination: req.body.destination, date: req.body.date},function(err, flights) {
    if (err) {
      return res.send(err);
    }
    flights.map=[
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                        'aa_aaaaa_aa',
                    ]
    Seat.find({id_flight: flights._id}, function(err, seats) {

    seats.each (function (error, seat){
      flights.occupied.push(seat.row + "_" + seat.column) //['1_2','2_1', '2_2', '4_1','7_1','7_2']
      if(seat.column<3)
        seat.column-=1;
      else if(seat.column>7)
        seat.column+=1;
      flight.map[seat.row][seat.column]=seats.preference;

      });
    res.json(flights);
    });
  });
});




module.exports = router;
