import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookmarkedProfileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  createdAt: { type: Date, default: Date.now }
});

const bookmarkModel = mongoose.model('Bookmark', bookmarkSchema);

export default bookmarkModel;