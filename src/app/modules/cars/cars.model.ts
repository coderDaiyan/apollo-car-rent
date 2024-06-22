import { Schema, model } from 'mongoose';
import { TCar } from './cars.interface';

const carSchema = new Schema<TCar>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  color: {
    type: String,
    required: true,
  },
  isElectric: {
    type: Boolean,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Car = model<TCar>('Car', carSchema);
export default Car;
