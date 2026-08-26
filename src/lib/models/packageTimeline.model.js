import mongoose from 'mongoose';

const packageTimelineSchema = new mongoose.Schema({
  dayTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    default: '',
  },
  image2: {
    type: String,
    default: '',
  },
}, { timestamps: true });

export const PackageTimeline = mongoose.models.PackageTimeline || mongoose.model('PackageTimeline', packageTimelineSchema);