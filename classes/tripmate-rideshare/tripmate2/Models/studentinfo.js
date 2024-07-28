const { Schema } = require('mongoose')
const { model } = require('mongoose')
const demo = new Schema({
    studentId: { type: Number, required: true },
    studentName: { type: String, required: true },
    enrollmentDate: { type: String, required: true },
    grade: { type: String, required: true }, 
})

const studentinfo  = model('studentinfo', demo) 
module.exports = studentinfo    