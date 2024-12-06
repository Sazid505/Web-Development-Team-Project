import axios from 'axios';

const API_URL = 'http://localhost:8888/api/auth';

// Register user
const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export { registerUser, loginUser };