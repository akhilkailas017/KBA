const { Schema} =require('mongoose');
const { model} =require('mongoose');


const demo = new Schema({
   userid: { type: String, required: true },
   name: { type: String, required: true },
   dob: { type: String, required: true } 
});


const sample = model('details', demo);
module.exports= sample;