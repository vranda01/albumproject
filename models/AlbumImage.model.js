const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumImage = new Schema({
  album_id: {
    type:String
  },
  aname: {
    type: String
  },
  image: {
    type: String 
  },
},{
    collection: 'images'
});
module.exports = mongoose.model('AlbumImage', AlbumImage);