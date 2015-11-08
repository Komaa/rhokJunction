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
  for(i=0;i<50;i++)
    seatmap.push('aa_aaaaa_aa');
  Seat.find({id_flight: givenseat.id_flight}, function(err, seats) {
  for(i=0; i< seats.length; i++) {
    seatmap[seats[i].seat.row]=seatmap[seats[i].seat.row].replaceAt(seats[i].seat.column,seats[i].preference);

    }
  });
  givenseat.seat=algorithm_sezi.preprocess(seatmap,givenseat.preference);
  console.log(givenseat);
  givenseat.save(function(err) {
    if (err) {
      return res.send(err);
    }
    return res.send('Checked In');
  });
});



module.exports = router;
