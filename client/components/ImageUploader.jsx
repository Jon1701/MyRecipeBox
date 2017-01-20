import React from 'react';

// Component definition.
class ImageUploader extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  // Handles change to the file upload control.
  handleFileChange() {
    // Get the file.
    const file = this.fileInput.files[0];

    // FileReader instance.
    const reader = new FileReader();
  }

  render() {
    return (
      <div className="field">
        <label className="label" htmlFor="recipe-upload">Upload Image</label>

        <input
          ref={(input) => { this.fileInput = input; }}
          onChange={() => { this.handleFileChange(); }}
          className="hidden"
          id="recipe-upload"
          type="file"
          accept="image/bmp,image/jpeg,image/pjpeg,image/png,image/gif"
        />

        <div className="container-inline">
          <button
            onClick={() => this.fileInput.click()}
            className="btn btn-default width-100"
            type="button"
          >
            Choose Image
          </button>

          <button
            className="btn btn-default width-100"
            type="button"
          >
            Remove Image
          </button>
        </div>
      </div>
    );
  }
}

// Component export.
export default ImageUploader;
