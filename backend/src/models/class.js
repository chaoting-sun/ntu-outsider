import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  number: {
    type: String,
    required: [true, 'class_no field is required.']
  }
});

const ClassModel = mongoose.model('Class', ClassSchema);

export { ClassModel };