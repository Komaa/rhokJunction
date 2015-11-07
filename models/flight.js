var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var flightSchema = new Schema({
  departure: String,
  destination: String,
  date: Date,
  departure_time: Date,
  schema_seat: String,
  number_rows: Number
});
flightSchema.set('versionKey', false);


module.exports = mongoose.model('Flight', flightSchema);
