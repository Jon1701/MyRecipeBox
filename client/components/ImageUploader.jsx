import React from 'react';

class ImageUploader extends React.Component {
  render() {
    return (
      <div className="input-group imageloader-group">
        <div className="text-center">Upload Image</div>
        <div className="btn-group">
          <button className="btn btn-add-remove" type="button">Upload Image</button>
          <button className="btn btn-add-remove" type="button">Remove Image</button>
        </div>
      </div>
    );
  }
}

// Component export.
export default ImageUploader;
