var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var seatSchema = new Schema({
  preference: String,
  id_user: [
      {type: Schema.Types.ObjectId, ref: 'User'}
    ],
  id_flight: [
      {type: Schema.Types.ObjectId, ref: 'Flight'}
    ],
  seat: {
    row : Number,
    column: Number
  },
  booking_number: String
});
seatSchema.set('versionKey', false);

module.exports = mongoose.model('Seat', seatSchema);
