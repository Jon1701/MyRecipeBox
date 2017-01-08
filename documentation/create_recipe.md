# Create recipe

| Name       | Method  | Description  |
|------------|---------|--------------|
| /api/auth/create_recipe | POST    | Creates a new recipe |

***

## Request Header
| Name  | Data Type | Required/Optional | Description |
|-------|-----------|-------------------|-------------|
| x-access-token    | string  | required  | Access Token |

## Request Body
| Name  | Data Type | Required/Optional | Description |
|-------|-----------|-------------------|-------------|
| title    | string  | required  | Recipe title |
| tagline  | string  | required  | Recipe tagline |
| ingredients  | [ string ]  | required  | List of ingredients |
| instructions | [ string ]  | required  | List of preparation steps |
| recipe_id | ObjectId  | optional  | ID of the recipe to be updated |

***

## Return format

A JSON object with the following keys and values:
* **code** - Response code
* **message** - Response message
* **payload** - JSON object containing the following keys and values:
 * **recipe** - JSON object containing recipe information
    * **_id** - Recipe ID
    * **username** - Recipe Author
    * **title** - Recipe Title
    * **tagline** - Recipe Tagline
    * **ingredients** - List of ingredients
    * **instructions** - List of preparation instructions

### Examples
```
{
  "code": "CREATE_RECIPE_SUCCESS",
  "message": "Recipe successfully created.",
  "payload": {
    "recipe": {
      "_id": "586bdb148d53a309258e5869",
      "username": "Sam I am",
      "title": "Green Eggs and Ham",
      "tagline": "A traditional delicacy from Dr. Seuss.",
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
    }
  }
}
```

```
{
  "code": "UPDATE_RECIPE_SUCCESS",
  "message": "Recipe successfully updated.",
  "payload": {
    "recipe": {
      "_id": "586bdb148d53a309258e5869",
      "username": "Sam I am",
      "title": "Blue Eggs and Jam",
      "tagline": "A traditional delicacy from Dr. Seuss.",
      "ingredients": [
        "5 eggs",
        "1 tablespoon pancakes"
      ],
      "instructions": [
        "Preheat oven to 375F",
        "Cook"
      ]
    }
  }
}
```

***

## Errors

All known errors cause the resource to return HTTP error code header along with a JSON object containing an **error code** and **error message**. The **error message** is provided only as a convenience, and should not be displayed to the user. Instead, use the **error code** and provide your own message to the end-user.

| Code | Description |
|------|-------------|
| DB_ERROR            | Some database error occurred |
| MISSING_TITLE       | Recipe title not provided |
| MISSING_TAGLINE     | Recipe tagline not provided |
| MISSING_INGREDIENTS | Recipe ingredients not provided |
| MISSING_INSTRUCTIONS        | Recipe preparation instructions not provided |
| MULTIPLE_INGREDIENTS_NEEDED | Few than 2 ingredients provided |
| MULTIPLE_PREPARATION_STEPS_NEEDED | Fewer than 2 preparation steps provided |
| MISSING_TOKEN | JSON Web Token was not provided |
| INVALID_TOKEN | JSON Web Token is malformed/invalid |

### Examples
```
{
  "code": "MISSING_TITLE",
  "message": "Recipe title is required."
}
```

```
{
  "code": "MISSING_TAGLINE",
  "message": "Recipe tagline is required."
}
```

```
{
  "code": "MISSING_INGREDIENTS",
  "message": "Recipe ingredients are required."
}
```

```
{
  "code": "MISSING_INSTRUCTIONS",
  "message": "Recipe preparation instructions are required."
}
```
