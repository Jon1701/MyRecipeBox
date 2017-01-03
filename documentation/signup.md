# User Signup

| Name        | Method  | Description  |
|-------------|---------|--------------|
| /api/signup | POST    | Facilitates user creation  |

***

## Request Body
| Name  | Data Type | Required/Optional | Description | Minimum length | Maximum Length | Allowed Characters |
|-------|-----------|-------------------|-------------|----------------|----------------|--------------------|
| username   | string  | required  | Username |  8 | 25  |<code>\w\d</code>|
| password1  | string  | required  | Password |  8 | 50  |<code>\w\d</code>|
| password2  | string  | required  | Confirm Password | 8 | 50 | <code>\w\d</code>|

***

## Return format

A JSON object with the following keys and values:
* **code** - Response code
* **message** - Response message
  * **payload** - JSON object containing the following keys and values:
    * **username** - Username
    * **userID** - Unique ID for this user

### Example
```
{
  "code": "USER_CREATED",
  "message": "User successfully created.",
  "payload": {
    "username": "HelloUsername",
    "userID": "586bd1d98d53a309258e5868"
  }
}
```
***

## Errors

All known errors cause the resource to return HTTP error code header along with a JSON object containing an **error code** and **error message**. The **error message** is provided only as a convenience, and should not be displayed to the user. Instead, use the **error code** and provide your own message to the end-user.

| Code | Description |
|------|-------------|
| DB_ERROR | Some database error occurred |
| MISSING_CREDENTIALS | No username, password, or password confirmation were provided |
| INVALID_USERNAME | Username is invalid |
| INVALID_PASSWORD | Password is invalid |
| PASSWORD_MISMATCH | Passwords do not match |
| MISSING_PASSWORD_CONFIRMATION | Password Confirmation not provided |
| USER_EXISTS | A user with that username already exists |

### Examples
```
{
  "code": "MISSING_PASSWORD_CONFIRMATION",
  "message": "Both password and password confirmation are required."
}
```

```
{
  "code": "MISSING_CREDENTIALS",
  "message": "Both a username and password are required."
}
```

```
{
  "code": "PASSWORD_MISMATCH",
  "message": "Passwords do not match."
}
```
