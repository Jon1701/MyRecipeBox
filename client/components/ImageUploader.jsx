import React from 'react';

class ImageUploader extends React.Component {
  render() {
    return (
      <div>
        <div>Upload Image</div>
        <div>
          <button type="button">Upload Image</button>
          <button type="button">Remove Image</button>
        </div>
      </div>
    );
  }
}

// Component export.
export default ImageUploader;
