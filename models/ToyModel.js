var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   name: String,
   price: Number,
   image: String,
   collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'collections'     
   }
});

var ToyModel = mongoose.model('toys', ToySchema); 
process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   // Handle the rejection or log it
 });
 
module.exports = ToyModel;