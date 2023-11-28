const mongoose = require('mongoose');
const { Schema, model } = mongoose;



const PostSchema = new Schema({
  title:{
    type : String,
    required : true,
  },
  category:{
    type : String,
    required : true,
  },
  content:{
    type : String,
    required : true,
  },
  cover:{
    type : String,
    required : true,
  },
  likes:{
    type : Number,
  },
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps : true,
});


const PostModel = model('Post', PostSchema);

module.exports = PostModel;



















// Create Post Schema 
// // information stored related to blog post can be

//// 1. title           ✔
//// 2. content         ✔
//// 3. category        ✔
//// 4. author          ✔
//// 5. post-tim & update time ✔
//// 6. likes count ?
//// 7. comments
/////     ↪ might be needed to build comments schema
                                                