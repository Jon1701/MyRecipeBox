# Get recipes

| Name       | Method  | Description  |
|------------|---------|--------------|
| /api/get_recipes  | GET    | Gets a list of recipes |

***

## Request Parameters
| Name  | Data Type | Required/Optional | Description |
|-------|-----------|-------------------|-------------|
| recipeID | ObjectID/string  | optional  | Recipe ID |
| username | string  | optional  | Recipe Author |
| pageNum  | number  | optional  | Current page of results |

***

## Return format

A JSON object with the following keys and values:
* **code** - Response code
* **message** - Response message
* **payload** - JSON object containing the following keys and values:
 * **recipes** - Array containing recipes
    * **_id** - Recipe ID
    * **username** - Recipe Author
    * **title** - Recipe Title
    * **tagline** - Recipe Tagline
    * **ingredients** - List of ingredients
    * **instructions** - List of preparation instructions

### Examples

#### Request
```
/api/get_recipes?username=Sam%20I%20am&pageNum=1
```

#### Response
```
{
  "code": "RECIPE_SEARCH_COMPLETE",
  "message": "Search results returned.",
  "payload": {
    "recipes": [
      {
        "_id": "586be24e21fa650e4130c314",
        "username": "Sam I am",
        "title": "Green Eggs and Ham",
        "tagline": "A traditional delicacy from Dr. Seuss",
        "ingredients": [
          "8 eggs",
          "1 tablespoon butter"
        ],
        "instructions": [
          "Preheat oven to 375F",
          "Cook",
          "Wait for a bit.",
          "Eat."
        ]
      },
      {
        "_id": "586bfacdfa72d81625752df8",
        "username": "Sam I am",
        "title": "Blue Eggs and Jam",
        "tagline": "A delicacy not from Dr. Seuss",
        "ingredients": [
          "8 eggs",
          "1 tablespoon jam"
        ],
        "instructions": [
          "Preheat oven to 375F",
          "Cook",
          "Wait for a bit.",
          "Eat."
        ]
      }
    ]
  }
}
```


#### Request
```
/api/get_recipes?username=Sam%20I%20am&pageNum=1771561
```

#### Response
```
{
  "code": "RECIPE_SEARCH_COMPLETE",
  "message": "Search results returned.",
  "payload": {
    "recipes": []
  }
}
```

***

## Errors

All known errors cause the resource to return HTTP error code header along with a JSON object containing an **error code** and **error message**. The **error message** is provided only as a convenience, and should not be displayed to the user. Instead, use the **error code** and provide your own message to the end-user.

| Code | Description |
|------|-------------|
| DB_ERROR            | Some database error occurred |
| INVALID_PAGE_NUMBER | Page number is invalid. Must be a positive integer greater than or equal to 1 |
| INVALID_RECIPE_ID   | Recipe ID is invalid. Must be a [MongoDB ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) |

### Examples

#### Request
```
/api/get_recipes?pageNum=-1701
```

#### Response
```
{
  "code": "INVALID_PAGE_NUMBER",
  "message": "Page number must be an integer greater than or equal to 1."
}
```

#### Request
```
/api/get_recipes?recipe_id=GreenEggsAndHam
```
#### Response
```
{
  "code": "INVALID_RECIPE_ID",
  "message": "Recipe ID is invalid"
}
```
