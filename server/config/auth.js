// Module definition.
const auth = {
  KEY: {
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY,
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
};

// Module export.
module.exports = auth;
