# User Login

| Name       | Method  | Description  |
|------------|---------|--------------|
| /api/login | POST    | Facilitates user authentication  |

***

## Request Body
| Name  | Data Type | Required/Optional | Description | Minimum length | Maximum Length | Allowed Characters |
|-------|-----------|-------------------|-------------|----------------|----------------|--------------------|
| username  | string  | required  | Username |  8 | 25  |<code>\w\d</code>|
| password  | string  | required  | Password |  8 | 50  |<code>\w\d</code>|

***

## Return format

A JSON object with the following keys and values:
* **code** - Response code
* **message** - Response message
  * **payload** - JSON object containing the following keys and values:
    * **username** - Username
    * **token** - JSON Web Token (Authentication Token)

### Example
```
{
  "code": "LOGIN_SUCCESS",
  "message": "Login successful.",
  "payload": {
    "username": "Jon1701",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0ODM0NTk2MTgsImV4cCI6MTUxNDk5NTYxOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.T_l2N9b2MYIwoycKg14YFqjCy2tzoryaf597rPwzgcU"
  }
}
```

***

## Errors

All known errors cause the resource to return HTTP error code header along with a JSON object containing an **error code** and **error message**. The **error message** is provided only as a convenience, and should not be displayed to the user. Instead, use the **error code** and provide your own message to the end-user.

| Code | Description |
|------|-------------|
| DB_ERROR            | Some database error occurred |
| MISSING_CREDENTIALS | No username or password were provided |
| INVALID_CREDENTIALS | Invalid username or password |


### Example
```
{
  "code": "MISSING_CREDENTIALS",
  "message": "Both a username and password are required."
}
```
