import React from 'react';

class ImageUploader extends React.Component {
  render() {
    return (
      <div className="field">
        <label className="label" htmlFor="recipe-upload">Upload Image</label>
        <div className="container-inline">
          <button className="btn btn-default width-100" type="button">Upload Image</button>
          <button className="btn btn-default width-100" type="button">Remove Image</button>
        </div>
      </div>
    );
  }
}

// Component export.
export default ImageUploader;
