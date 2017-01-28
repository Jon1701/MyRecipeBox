# MyRecipeBox

## Prerequisites

1. Sign up for a MongoDB Database-as-a-Service (DaaS) service such as [mLab.com](https://www.mlab.com), or set up your own local instance.

2. If creating your own local instance, refer to the MongoDB documentation for instructions on setting up authentication, and security.

3. Create a database to hold the collections.

4. Create two (2) collections within that database: <code>users</code> and <code>recipes</code>.

5. Sign up for a [Cloudinary](https://www.cloudinary.com) account. Cloudinary is an end-to-end image management solution for your website and mobile apps. Rather than storing a base64 encoded string representation of an image within MongoDB, the image is stored on Cloudinary servers, and a link to that is stored in your MongoDB database.

6. Create the following environment variables, filling in the appropriate values from your MongoDB instance, and Cloudinary Dashboard. You may choose <code>JWT_SIGNING_KEY</code> to be any value you wish.

| Environment Variable  | Description                                 |
|-----------------------|---------------------------------------------|
| JWT_SIGNING_KEY       | Secret key used to sign JSON Web Tokens     |
| DB_NAME               | Database name                               |
| DB_USER               | Database User                               |
| DB_PASSWORD           | Password of the Database User               |
| DB_URL                | URL of the database                         |
| DB_PORT               | Database port                               |
| CLOUDINARY_CLOUD_NAME | Unique name of your Cloudinary cloud server |
| CLOUDINARY_API_KEY    | Cloudinary API Key                          |
| CLOUDINARY_API_SECRET | Cloudinary API Secret Key                   |

## Installation

1. Clone repository

  ```
  git clone https://github.com/Jon1701/MyRecipeBox.git
  ```

2. Install dependencies

  ```
  yarn install
  ```

3. Run server

  ```
  yarn run server
  ```

4. Run client

  ```
  yarn run client
  ```

5. View in browser: http://localhost:8080

## API Reference

- **[<code>GET</code> /api/get_recipes](documentation/get_recipes.md)**
- **[<code>POST</code> /api/login](documentation/login.md)**
- **[<code>POST</code> /api/signup](documentation/signup.md)**
- **[<code>POST</code> /api/auth/create_recipe](documentation/create_recipe.md)**
- **[<code>POST</code> /api/auth/upload_image](documentation/upload_image.md)**

## Tests

Not implemented yet.

## Contributors

Jon1701

## License

MIT
