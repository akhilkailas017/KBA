const { Schema ,model} =require('mongoose');
const demo = new Schema({
   BlogID:
      { type: String,
      required: true
      },

   Title:
      { type: String,
    required: true 
      },

   Author:
      { type: String,
      required: true 
      },

   Content: 
      { type: String, 
      required: true 
      },
   // Add other fields as needed
}  );


const blogdetails = model('blogdetails', demo);
module.exports= blogdetails;