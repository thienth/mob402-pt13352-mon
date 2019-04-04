var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name:  {type: String, unique : true, required : true, dropDups: true},
  cate_id: {type: Schema.Types.ObjectId, ref: 'categories'},
  price: {type: Number, default: 0},
  detail: {type: String, default: null},
  image: {type: String, default: null}
});


module.exports = mongoose.model('products', categorySchema);