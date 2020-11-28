var cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || dsbx0t4g3,
  api_key: process.env.CLOUDINARY_API_KEY || 653991295757619,
  api_secret: process.env.CLOUDINARY_API_SECRET || WYtGHRRw3hMuiqxxeOcACKOFte8,
});

module.exports = cloudinary;
