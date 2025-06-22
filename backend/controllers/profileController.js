import Profile from '../models/Profile.js';
import { cloudinary } from '../utils/cloudinary.js';
import Bookmark from '../models/Bookmark.js';
//cretateEditorUpdate profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profileData = req.body;

    // Handle uploaded images
    const imageFields = ['image1', 'image2', 'image3', 'image4'];
    const files = imageFields.map((field) => req.files[field]?.[0]).filter(Boolean);

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    if (uploadedUrls.length > 0) {
      profileData.photos = uploadedUrls;
    }

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      const updated = await Profile.findOneAndUpdate({ userId }, profileData, { new: true });
      return res.json({ success: true, message: "Profile updated", profile: updated });
    } else {
      const newProfile = new Profile({ ...profileData, userId });
      await newProfile.save();
      return res.json({ success: true, message: "Profile created", profile: newProfile });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



//get user profile 
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get profile by profile Id
// const getProfileById = async (req, res) => {
//   try {
//     const profileId = req.params.id;
//     console.log(profileId)
//     const profile = await Profile.findById(profileId).populate('userId', 'email');


//     if (!profile) {
//       return res.status(404).json({ success: false, message: "Profile not found" });
//     }

//     res.json({ success: true, profile });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getProfileById = async (req, res) => {
  try {
    const profileId = req.params.id;
    const viewerId = req.user?.userId || null; // Safe access (in case auth is optional)

    const profile = await Profile.findById(profileId).populate('userId', 'email');

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    let bookmarked = false;

    if (viewerId) {
     
    const bookmark = await Bookmark.findOne({
        userId: viewerId,
        bookmarkedProfileIds: profileId
      });

      bookmarked = !!bookmark;
    }

    res.json({ success: true, profile, bookmarked });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




//GET all profiles 
const getAllProfiles = async (req, res) => {
  try {
    const currentUserId = req.user?.userId; // retrieved from authMiddleware if token is passed

    const query = currentUserId
      ? { userId: { $ne: currentUserId } } // Exclude logged-in user's profile
      : {}; // If no user logged in, fetch all

    const profiles = await Profile.find(query).select('-__v').limit(50);
    res.json({ success: true, profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export {
  createOrUpdateProfile,
  getMyProfile,
  getProfileById,
  getAllProfiles,
  
};



