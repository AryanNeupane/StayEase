const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// console.log('Cloudinary config:', {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY ? '***' : 'undefined',
//   api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'undefined'
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'StayEase',
    allowedFormats: ['png', 'jpg', 'jpeg'],  // correct key and value type
  }
});

module.exports = {
  cloudinary,
  storage
};
