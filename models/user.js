var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema = new Schema({
  username: String,
});
userSchema.set('versionKey', false);

module.exports = mongoose.model('User', userSchema);
