import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  classNumber: {
    type: String,
    required: [true, 'classNumber field is required.']
  },
  className: {type: String,
    required: [true, 'className field is required.']}
});

const ClassModel = mongoose.model('Class', ClassSchema);

export { ClassModel };