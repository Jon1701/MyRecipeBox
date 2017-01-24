// Module definition.
const decodeToken = (token) => {
  // Split token into header, payload, and signature.
  const parts = token.split('.');

  // Extract header, and payload.
  return {
    header: JSON.parse(atob(parts[0])),
    payload: JSON.parse(atob(parts[1])),
  };
};

// Module export.
module.exports = decodeToken;
