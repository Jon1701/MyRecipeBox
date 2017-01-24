# Upload Image

| Name                   | Method | Description                                    |
|------------------------|--------|------------------------------------------------|
| /api/auth/upload_image | POST   | Uploads a new image to an image hosting server |

***

## Request Header
| Name              | Data Type | Required/Optional | Description  |
|-------------------|-----------|-------------------|--------------|
| x-access-token    | string    | required          | Access Token |

## Request Body

| Name            | Data Type | Required/Optional | Description                               |
|-----------------|-----------|-------------------|-------------------------------------------|
| image_base64    | string    | required          | Base64 string representation of the image |

***

## Return format

A JSON object with the following keys and values:
* **code** - Response code
* **message** - Response message
* **payload** - JSON object containing the following keys and values:
 * **image** - JSON object containing image information
    * **width** - Image width (in pixels)
    * **height** - Image height (in pixels)
    * **format** - Image file format
    * **url** - Image URL
    * **secure_url** - Image URL (HTTPS)
    * **filesize_in_bytes** - Image size in bytes

### Example
```
{
  "code": "UPLOAD_SUCCESSFUL",
  "message": "Image uploaded successfully.",
  "payload": {
    "image": {
      "width": 864,
      "height": 576,
      "format": "jpg",
      "url": "http://res.cloudinary.com/recipebox/image/upload/v1484933154/sample.jpg",
      "secure_url": "https://res.cloudinary.com/recipebox/image/upload/v1484933154/sample.jpg",
      "filesize_in_bytes": 35407
    }
  }
}
```

***

## Errors

All known errors cause the resource to return HTTP error code header along with a JSON object containing an **error code** and **error message**. The **error message** is provided only as a convenience, and should not be displayed to the user. Instead, use the **error code** and provide your own message to the end-user.

| Code              | Description                                                         |
|-------------------|---------------------------------------------------------------------|
| NO_IMAGE_PROVIDED | No image was provided                                               |
| INVALID_IMAGE     | Invalid file format (Only .jpg, .gif, .png, and .bmp files allowed) |
| FILE_TOO_LARGE    | Image too large, must be 5MB or less                                |
| UPLOAD_FAILED     | Upload failed. Server error or malformed image/base64 string        |
| MISSING_TOKEN     | JSON Web Token was not provided                                     |
| INVALID_TOKEN     | JSON Web Token is malformed/invalid                                 |

### Examples
```
{
  "code": "NO_IMAGE_PROVIDED",
  "message": "An image is required."
}
```

```
{
  "code": "UPLOAD_FAILED",
  "message": "Server error. Image upload failed."
}
```
