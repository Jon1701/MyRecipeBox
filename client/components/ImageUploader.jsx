// Dependencies.
import React from 'react';  // React.
import request from 'common/request'; // HTTP GET/POST functionality.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.

// Component definition.
class ImageUploader extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Component state.
    this.state = {
      uploading: false,
    };

    // Bind methods to component instance.
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setAlert = this.setAlert.bind(this); // Set current alert.
    this.clearAlert = this.clearAlert.bind(this); // Clear the current alert.
  }

  // Method to set the current alert.
  setAlert(type, message) {
    this.setState({ alert: { type, message } });
  }

  // Method to clear the current alert.
  clearAlert() {
    this.setState({ alert: null });
  }

  // Handles change to the file upload control.
  handleFileChange(e) {
    // Prevent default action.
    e.preventDefault();

    // Clear any existing alerts.
    this.clearAlert();

    // Get the file.
    const file = this.fileInput.files[0];

    // FileReader instance.
    const reader = new FileReader();

    // Read the file.
    reader.readAsDataURL(file);

    // When reading the file is complete, upload to server.
    reader.onloadend = () => {
      // Uploading has started, set it in state.
      this.setState({ uploading: true });

      // Create request body.
      const body = {
        image_base64: reader.result,
      };

      // Send POST request to the server. Send base64 string, and token.
      request
        .post('/api/auth/upload_image', body, this.props.token)
        .then((res) => {
          // Different actions based on server response.
          switch (res.data.code) {
            // Image succesfully uploaded.
            case 'UPLOAD_SUCCESSFUL': {
              // Get image url.
              const url = res.data.payload.image.secure_url;

              // Store image in the state of the NewRecipe widget.
              this.props.storeImage(url);

              // Store image in state, set uploading to false.
              this.setState({
                uploading: false,
              });
              break;
            }

            // Default case: do nothing.
            default:
              break;
          }
        })
        .catch((err) => {
          // Uploading has failed, set it in state.
          this.setState({ uploading: false });

          // Different error messages based on server response.
          this.setAlert('FAILURE', err.response.data.message);
        });
    };
  }

  render() {
    // Deconstruct state.
    const { uploading } = this.state;
    const image = this.props.image;

    // Display image.
    let displayImage;

    // Case: No image, no upload.
    if (image === null && !uploading) {
      displayImage = (
        <div className="text-center">
          <img src="https://placeholdit.imgix.net/~text?txtsize=70&txt=No%20Photo&w=300&h=300" role="presentation" />
        </div>
      );
    }

    // Case: uploading.
    if (uploading) {
      displayImage = (
        <div className="text-center">
          Uploading...
        </div>
      );
    }

    // Case: Image is available, not uploading.
    if (image && !uploading) {
      displayImage = (
        <div className="text-center">
          <img src={image} role="presentation" />
        </div>
      );
    }

    return (
      <div className="container-recipe-uploader field">
        <label className="label" htmlFor="recipe-upload">Upload Image</label>

        {displayImage}

        <input
          ref={(input) => { this.fileInput = input; }}
          onChange={(e) => { this.handleFileChange(e); }}
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
            onClick={() => this.props.storeImage(null)}
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

// Prop validation.
ImageUploader.propTypes = {
  token: React.PropTypes.string.isRequired,
  storeImage: React.PropTypes.func.isRequired,
};

// Component export.
export default ImageUploader;
