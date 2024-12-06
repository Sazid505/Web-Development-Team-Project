
const updateUserProfile = async (req, res) => {
  try {
   
    res.send('User updated');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateUserProfile,
};