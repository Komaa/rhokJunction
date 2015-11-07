var Seat = require('../models/userflight');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var algorithm_sezi = require('../algorithm_sezi');


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
  });
});

//set a reservation
router.route('/checkin').post(function(req, res) {
  var givenseat = new Seat();
  givenseat.id_user=req.body.id_user;
  givenseat.id_flight=req.body.id_flight;
  givenseat.preference=req.body.preference;
  var seatmap=[
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
  Seat.find({id_flight: seat.id_flight}, function(err, seats) {

  seats.each (function (error, seat){
    if(seat.column<3)
      seat.column-=1;
    else if(seat.column>7)
      seat.column+=1;
    seatmap[seat.row][seat.column]=seats.preference;

    });
  });
  givenseat.seat=algorithm_sezi.preprocess(seatmap);
  givenseat.save(function(err) {
    if (err) {
      return res.send(err);
    }
  });
});



module.exports = router;
