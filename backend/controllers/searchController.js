import Profile from '../models/Profile.js';

const searchProfiles = async (req, res) => {
  try {
    const {
      minAge,
      maxAge,
      religion,
      caste,
      gender,
      city,
      country,
      education,
      occupation
    } = req.query;

    const query = {};

    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = Number(minAge);
      if (maxAge) query.age.$lte = Number(maxAge);
    }

    // Use case-insensitive regex for string fields
    if (religion) query.religion = { $regex: new RegExp(`^${religion}$`, 'i') };
    if (caste) query.caste = { $regex: new RegExp(`^${caste}$`, 'i') };
    if (gender) query.gender = { $regex: new RegExp(`^${gender}$`, 'i') };
    if (city) query['location.city'] = { $regex: new RegExp(`^${city}$`, 'i') };
    if (country) query['location.country'] = { $regex: new RegExp(`^${country}$`, 'i') };
    if (education) query.education = { $regex: new RegExp(`^${education}$`, 'i') };
    if (occupation) query.occupation = { $regex: new RegExp(`^${occupation}$`, 'i') };

    const profiles = await Profile.find(query).limit(50);

    res.json({ success: true, results: profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { searchProfiles };