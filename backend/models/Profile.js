import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Personal Info
  fullName: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  religion: String,
  caste: String,
  motherTongue: String,
  location: {
    city: String,
    country: String,
  },
  photos: [String],

  // Professional Info
  education: String,
  occupation: String,
  income: String,

  // Family Info
  familyDetails: {
    father: String,
    mother: String,
    siblings: Number,
    familyType: { type: String, enum: ['Nuclear', 'Joint'] }
  },

  // Lifestyle & Interests
  habits: {
    drinking: Boolean,
    smoking: Boolean,
  },
  hobbies: [String],
  interests: [String],

  // Partner Preferences
  partnerPreferences: {
    minAge: Number,
    maxAge: Number,
    religion: String,
    caste: String,
    education: String,
    occupation: String,
    location: String
  }
}, { timestamps: true });

const profileModel= mongoose.model('Profile', profileSchema);
export default profileModel;
