import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    buttonText:{type:String},
    type:{type:String},
}, {
  timestamps: true,
})

export const Carousel = mongoose.models.Carousel || mongoose.model('Carousel',carouselSchema);