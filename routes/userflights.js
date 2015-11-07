var Seat = require('../models/userflight');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


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
  var seat = new Seat();
  seat.id_user=req.body.id_user;
  seat.id_flight=req.body.id_flight;
  seat.preference=req.body.preference;
  seat.seat=
  seat.save(function(err) {
    if (err) {
      return res.send(err);
    }
  });
});



module.exports = router;
