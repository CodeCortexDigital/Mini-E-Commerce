const User = require("../models/User");

/* ===============================
   GET USER PROFILE
   =============================== */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE USER PROFILE
   =============================== */
exports.updateProfile = async (req, res) => {
  try {
    const { name, address } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;

    if (address) {
      user.address.address = address.address || user.address.address;
      user.address.city = address.city || user.address.city;
      user.address.postalCode =
        address.postalCode || user.address.postalCode;
      user.address.country = address.country || user.address.country;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
