require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT || 3003;

module.exports = {
  MONGODB_URI,
  TOKEN,
  PORT
}