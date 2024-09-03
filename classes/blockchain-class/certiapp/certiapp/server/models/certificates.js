const {Schema} =require('mongoose');
const {model} =require('mongoose');

const certificateschema = new Schema({
   course: { type: String, required: true },
   certificateid: { type: String, required: true },
   candidatename: { type: String, required: true },
   grade: { type: String, required: true },
   date: {type: String, required: true}
});

const certificates = model('certificates', certificateschema);

module.exports = certificates;
