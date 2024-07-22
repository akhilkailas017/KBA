const { Schema} =require('mongoose');
const { model} =require('mongoose');


const demo = new Schema({
   certificateid: { type: String, required: true },
   course: { type: String, required: true },
   candidatename: { type: String, required: true },
   grade: { type: String, required: true } ,
   issuedate: { type: String, required: true }
});


const sample = model('details', demo);
module.exports= sample;