import bookmarkModel from '../models/Bookmark.js';
import Profile from '../models/Profile.js';

//  Bookmark a profile
const bookmarkProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { profileId } = req.params;

    let bookmark = await bookmarkModel.findOne({ userId });

    if (!bookmark) {
      bookmark = new bookmarkModel({ userId, bookmarkedProfileIds: [profileId] });
    } else {
      if (!bookmark.bookmarkedProfileIds.includes(profileId)) {
        bookmark.bookmarkedProfileIds.push(profileId);
      }
    }

    await bookmark.save();
    res.json({ success: true, message: 'Profile bookmarked successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get all bookmarked profiles for a user
const getBookmarkedProfiles = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookmark = await bookmarkModel
      .findOne({ userId })
      .populate('bookmarkedProfileIds');
    // console.log(bookmark)
    if (!bookmark || bookmark.bookmarkedProfileIds.length === 0) {
      return res.json({ success: true, bookmarks: [] });
    }

    res.json({ success: true, bookmarks: bookmark.bookmarkedProfileIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Remove a profile from bookmarks
const removeBookmarkedProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { profileId } = req.params;

    await bookmarkModel.updateOne(
      { userId },
      { $pull: { bookmarkedProfileIds: profileId } }
    );

    res.json({ success: true, message: 'Profile removed from bookmarks.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  bookmarkProfile,
  getBookmarkedProfiles,
  removeBookmarkedProfile
};
