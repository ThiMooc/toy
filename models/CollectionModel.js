var mongoose = require('mongoose');
var CollectionSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [1, 'collection name must be at least 1 characters'],
         maxlength: 20
      },
      country: String   
   });
var CollectionModel = mongoose.model('collections', CollectionSchema);
module.exports = CollectionModel;
process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
 });
 