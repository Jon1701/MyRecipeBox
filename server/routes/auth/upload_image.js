// Modules
const cloudinary = require('cloudinary'); // Cloud-based image storage service.
const rfr = require('rfr'); // Root-relative paths.

// Cloudinary API keys.
const CLOUDINARY_AUTH = rfr('/server/config/auth').CLOUDINARY;

// Cloudinary configuration.
cloudinary.config({
  cloud_name: CLOUDINARY_AUTH.CLOUD_NAME,
  api_key: CLOUDINARY_AUTH.API_KEY,
  api_secret: CLOUDINARY_AUTH.API_SECRET,
});

// Success/Error Response messages.
const MSG = (code) => {
  const messages = {
    NO_IMAGE_PROVIDED: 'An image is required.',
    INVALID_IMAGE: 'Only .jpg, .gif, .png, and .bmp files allowed.',
    FILE_TOO_LARGE: 'Image must be no more than 5MB in size.',
    UPLOAD_FAILED: 'Server error. Image upload failed.',
    UPLOAD_SUCCESSFUL: 'Image uploaded successfully.',
  };

  // Return message as an Object.
  return {
    code,
    message: messages[code],
  };
};

// Calculates the file size from a base64 encoded string.
const getFileSize = (image) => {
  // Image data (header and content).
  const imageData = image.replace(/=+/, '');

  // Image padding.
  const imagePadding = image.match(/=+/)[0];

  // Calculate filesize in bytes.
  const fileSizeInBytes = Math.ceil(((imageData.length) * 0.75) - imagePadding.length);

  // Return file size in bytes.
  return fileSizeInBytes;
};

// Performs validation.
const validation = (image) => {
  // If no image was provided, return error.
  if (!image) {
    return MSG('NO_IMAGE_PROVIDED');
  }

  // If the image file size is larger than 5MB (5242880 bytes), return an error.
  const fileSizeInBytes = getFileSize(image);
  if (fileSizeInBytes > 5242880) {
    return MSG('FILE_TOO_LARGE');
  }

  // Return null if no errors were found.
  return null;
};

// Route definition.
const uploadImage = (req, res, next) => {
  // Get the image from the request body.
  const image = req.body.image_base64;

  // Request body validation and error checking.
  const error = validation(image);
  if (error) {
    return next(error);
  }

  // Upload file to Cloudinary server.
  cloudinary.uploader.upload(image, (result) => {
    // If an upload error occurred, return error.
    if (result.error) {
      return next(MSG('UPLOAD_FAILED'));
    }

    // No error occurred, extract fields from response.
    const { width, height, format, bytes, url, secure_url } = result;

    // Response payload.
    const payload = {
      image: {
        width,
        height,
        format,
        url,
        secure_url,
        filesize_in_bytes: bytes,
      },
    };

    // Send response back to client.
    return res.json(Object.assign({}, MSG('UPLOAD_SUCCESSFUL'), { payload }));
  });

  // Keep linter happy.
  return true;
};

// Route export.
module.exports = uploadImage;
