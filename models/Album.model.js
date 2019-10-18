const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema({
  user_id: {
    type:String
  },
  aname: {
    type: String
  },
  covimage: {
    type: String 
  },
},{
    collection: 'albums'
});
module.exports = mongoose.model('Album', Album);