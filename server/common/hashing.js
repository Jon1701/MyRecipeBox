// Dependencies.
const crypto = require('crypto'); // Crypto package.

// Generate a salt.
const generateSalt = (length) => {
  // Generate random bytes.
  const randBytes = crypto.randomBytes(Math.ceil(length / 2));

  // Return hexadecimal string.
  return randBytes.toString('hex').slice(0, length);
};

// Generate hashed password from a plaintext password, and a salt.
const generateHashedPassword = (password, salt) => {
  // Create SHA512 hash.
  const hash = crypto.createHmac('sha512', salt);

  // Update hash with plaintext password.
  hash.update(password);

  // Get hashed password.
  const hashedPassword = hash.digest('hex');

  // Return salt, and hashed password.
  return {
    salt,
    hash: hashedPassword,
  };
};

// Exports.
module.exports = { generateSalt, generateHashedPassword };
