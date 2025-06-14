# Satyam Creation API Documentation

## Base URL

All API endpoints are prefixed with: `http://localhost:3000/v1/api`

## Products API

### Create Product

- **Endpoint**: `POST /product/create`
- **Content-Type**: `multipart/form-data`
- **Description**: Creates a new product with images
- **Authorization**: None

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Product name |
| description | String | No | Product description |
| price | Number | Yes | Product price |
| category | ObjectId | Yes | Category ID |
| address | String | Yes | Product address |
| contactNumber | String | Yes | Contact number |
| email | String | Yes | Contact email |
| isTrending | Boolean | No | Whether the product is trending (default: false) |
| images | Files | Yes | Up to 5 product images |

**Example Request**:

```
POST http://localhost:3000/v1/api/product/create
Content-Type: multipart/form-data

{
  "name": "Handmade Wooden Table",
  "description": "Beautiful handcrafted wooden table",
  "price": 5999,
  "category": "648d7f7ec64d9548a9b9778a",
  "address": "123 Main St, City, State",
  "contactNumber": "9876543210",
  "email": "contact@example.com",
  "isTrending": true,
  "images": [file1, file2]
}
```

**Success Response (201 Created)**:

```json
{
  "statusCode": 201,
  "data": {
    "_id": "648d8f9ec64d9548a9b9778c",
    "name": "Handmade Wooden Table",
    "description": "Beautiful handcrafted wooden table",
    "price": 5999,
    "category": "648d7f7ec64d9548a9b9778a",
    "imageURLs": [
      "https://res.cloudinary.com/example/image/upload/v1686938286/products/image1.jpg",
      "https://res.cloudinary.com/example/image/upload/v1686938287/products/image2.jpg"
    ],
    "address": "123 Main St, City, State",
    "contactNumber": "9876543210",
    "email": "contact@example.com",
    "isTrending": true,
    "createdAt": "2025-06-02T12:38:06.693Z",
    "updatedAt": "2025-06-02T12:38:06.693Z",
    "__v": 0
  },
  "message": "Product created successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Missing required fields or invalid data
- `404 Not Found`: Category not found
- `500 Internal Server Error`: Server-side error

### Update Product

- **Endpoint**: `PATCH /product/update/:id`
- **Content-Type**: `multipart/form-data`
- **Description**: Updates an existing product
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | Product ID |

**Request Body** (all fields are optional):
| Field | Type | Description |
|-------|------|-------------|
| name | String | Product name |
| description | String | Product description |
| price | Number | Product price |
| category | ObjectId | Category ID |
| address | String | Product address |
| contactNumber | String | Contact number |
| email | String | Contact email |
| isTrending | Boolean | Whether the product is trending |
| images | Files | Up to 5 product images |

**Example Request**:

```
PATCH http://localhost:3000/v1/api/product/update/648d8f9ec64d9548a9b9778c
Content-Type: multipart/form-data

{
  "price": 4999,
  "isTrending": false,
  "images": [file1, file2, file3]
}
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "648d8f9ec64d9548a9b9778c",
    "name": "Handmade Wooden Table",
    "description": "Beautiful handcrafted wooden table",
    "price": 4999,
    "category": "648d7f7ec64d9548a9b9778a",
    "imageURLs": [
      "https://res.cloudinary.com/example/image/upload/v1686938286/products/image1.jpg",
      "https://res.cloudinary.com/example/image/upload/v1686938287/products/image2.jpg",
      "https://res.cloudinary.com/example/image/upload/v1686938288/products/image3.jpg"
    ],
    "address": "123 Main St, City, State",
    "contactNumber": "9876543210",
    "email": "contact@example.com",
    "isTrending": false,
    "createdAt": "2025-06-02T12:38:06.693Z",
    "updatedAt": "2025-06-02T12:45:22.123Z",
    "__v": 0
  },
  "message": "Product updated successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Invalid data
- `404 Not Found`: Product not found
- `500 Internal Server Error`: Server-side error

### Get All Products

- **Endpoint**: `GET /product/all`
- **Description**: Retrieves all products
- **Authorization**: None

**Example Request**:

```
GET http://localhost:3000/v1/api/product/all
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "648d8f9ec64d9548a9b9778c",
      "name": "Handmade Wooden Table",
      "description": "Beautiful handcrafted wooden table",
      "price": 4999,
      "category": {
        "_id": "648d7f7ec64d9548a9b9778a",
        "categoryType": "Furniture"
      },
      "imageURLs": [
        "https://res.cloudinary.com/example/image/upload/v1686938286/products/image1.jpg",
        "https://res.cloudinary.com/example/image/upload/v1686938287/products/image2.jpg",
        "https://res.cloudinary.com/example/image/upload/v1686938288/products/image3.jpg"
      ],
      "address": "123 Main St, City, State",
      "contactNumber": "9876543210",
      "email": "contact@example.com",
      "isTrending": false,
      "createdAt": "2025-06-02T12:38:06.693Z",
      "updatedAt": "2025-06-02T12:45:22.123Z"
    }
    // More products...
  ],
  "message": "Products fetched successfully"
}
```

**Error Response**:

- `500 Internal Server Error`: Server-side error

### Get Products by Category

- **Endpoint**: `GET /product/category/:categoryId`
- **Description**: Retrieves all products in a specific category
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| categoryId | String | Category ID |

**Example Request**:

```
GET http://localhost:3000/v1/api/product/category/648d7f7ec64d9548a9b9778a
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "648d8f9ec64d9548a9b9778c",
      "name": "Handmade Wooden Table",
      "description": "Beautiful handcrafted wooden table",
      "price": 4999,
      "category": {
        "_id": "648d7f7ec64d9548a9b9778a",
        "categoryType": "Furniture"
      },
      "imageURLs": [
        "https://res.cloudinary.com/example/image/upload/v1686938286/products/image1.jpg",
        "https://res.cloudinary.com/example/image/upload/v1686938287/products/image2.jpg"
      ],
      "address": "123 Main St, City, State",
      "contactNumber": "9876543210",
      "email": "contact@example.com",
      "isTrending": false,
      "createdAt": "2025-06-02T12:38:06.693Z",
      "updatedAt": "2025-06-02T12:45:22.123Z"
    }
    // More products in this category...
  ],
  "message": "Products for the category fetched successfully"
}
```

**Error Response**:

- `500 Internal Server Error`: Server-side error

### Get Trending Products

- **Endpoint**: `GET /product/trending`
- **Description**: Retrieves all trending products
- **Authorization**: None

**Example Request**:

```
GET http://localhost:3000/v1/api/product/trending
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "648d8f9ec64d9548a9b9778d",
      "name": "Handmade Pottery Vase",
      "description": "Beautiful handcrafted pottery vase",
      "price": 1299,
      "category": {
        "_id": "648d7f7ec64d9548a9b9778b",
        "categoryType": "Home Decor"
      },
      "imageURLs": [
        "https://res.cloudinary.com/example/image/upload/v1686938286/products/vase1.jpg",
        "https://res.cloudinary.com/example/image/upload/v1686938287/products/vase2.jpg"
      ],
      "address": "123 Main St, City, State",
      "contactNumber": "9876543210",
      "email": "contact@example.com",
      "isTrending": true,
      "createdAt": "2025-06-02T12:38:06.693Z",
      "updatedAt": "2025-06-02T12:45:22.123Z"
    }
    // More trending products...
  ],
  "message": "Trending Products fetched Successfully"
}
```

**Error Response**:

- `500 Internal Server Error`: Error while fetching trending products

### Delete Product

- **Endpoint**: `DELETE /product/delete/:id`
- **Description**: Deletes a product
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | Product ID |

**Example Request**:

```
DELETE http://localhost:3000/v1/api/product/delete/648d8f9ec64d9548a9b9778c
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Product deleted successfully"
}
```

**Error Responses**:

- `404 Not Found`: Product not found
- `500 Internal Server Error`: Server-side error

## Categories API

### Create Category

- **Endpoint**: `POST /category/createCategories`
- **Content-Type**: `multipart/form-data`
- **Description**: Creates a new category
- **Authorization**: None

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| categoryType | String | Yes | Category name |
| isFeature | Boolean | No | Whether the category is featured (default: false) |
| productCount | Number | No | Number of products in this category (default: 0) |
| imageURL | File | Yes | Category image |

**Example Request**:

```
POST http://localhost:3000/v1/api/category/createCategories
Content-Type: multipart/form-data

{
  "categoryType": "Furniture",
  "isFeature": true,
  "productCount": 0,
  "imageURL": file
}
```

**Success Response (201 Created)**:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "648d7f7ec64d9548a9b9778a",
    "categoryType": "Furniture",
    "imageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/categories/furniture.jpg",
    "isFeature": true,
    "productCount": 0,
    "createdAt": "2025-06-02T12:30:06.693Z",
    "updatedAt": "2025-06-02T12:30:06.693Z",
    "__v": 0
  },
  "message": "Category created successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Category type is required or image file is required
- `409 Conflict`: Category type already exists
- `500 Internal Server Error`: Something went wrong while creating a new category

### Get All Categories

- **Endpoint**: `GET /category/getAllCategories`
- **Description**: Retrieves all categories
- **Authorization**: None

**Example Request**:

```
GET http://localhost:3000/v1/api/category/getAllCategories
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "648d7f7ec64d9548a9b9778a",
      "categoryType": "Furniture",
      "imageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/categories/furniture.jpg",
      "isFeature": true,
      "productCount": 0,
      "createdAt": "2025-06-02T12:30:06.693Z",
      "updatedAt": "2025-06-02T12:30:06.693Z"
    },
    {
      "_id": "648d7f7ec64d9548a9b9778b",
      "categoryType": "Home Decor",
      "imageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/categories/home-decor.jpg",
      "isFeature": true,
      "productCount": 0,
      "createdAt": "2025-06-02T12:31:06.693Z",
      "updatedAt": "2025-06-02T12:31:06.693Z"
    }
    // More categories...
  ],
  "message": "All categories retrieved"
}
```

**Error Response**:

- `500 Internal Server Error`: Something went wrong while fetching all categories

### Get Category by ID

- **Endpoint**: `GET /category/getCategoryById/:id`
- **Description**: Retrieves a category by its ID
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | Category ID |

**Example Request**:

```
GET http://localhost:3000/v1/api/category/getCategoryById/648d7f7ec64d9548a9b9778a
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "648d7f7ec64d9548a9b9778a",
    "categoryType": "Furniture",
    "imageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/categories/furniture.jpg",
    "isFeature": true,
    "productCount": 0,
    "createdAt": "2025-06-02T12:30:06.693Z",
    "updatedAt": "2025-06-02T12:30:06.693Z"
  },
  "message": "Category found"
}
```

**Error Response**:

- `404 Not Found`: Category not found

### Get Featured Categories

- **Endpoint**: `GET /category/getFeaturedCategories`
- **Description**: Retrieves all featured categories
- **Authorization**: None

**Example Request**:

```
GET http://localhost:3000/v1/api/category/getFeaturedCategories
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "648d7f7ec64d9548a9b9778a",
      "categoryType": "Furniture",
      "imageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/categories/furniture.jpg",
      "isFeature": true,
      "productCount": 0,
      "createdAt": "2025-06-02T12:30:06.693Z",
      "updatedAt": "2025-06-02T12:30:06.693Z"
    },
    {
      "_id": "648d7f7ec64d9548a9b9778b",
      "categoryType": "Home Decor",
      "imageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/categories/home-decor.jpg",
      "isFeature": true,
      "productCount": 0,
      "createdAt": "2025-06-02T12:31:06.693Z",
      "updatedAt": "2025-06-02T12:31:06.693Z"
    }
    // More featured categories...
  ],
  "message": "All featured categories fetch successfully"
}
```

**Error Response**:

- `500 Internal Server Error`: Something went wrong while fetching featured categories

### Update Category

- **Endpoint**: `PATCH /category/updateCategory/:id`
- **Content-Type**: `multipart/form-data`
- **Description**: Updates a category
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | Category ID |

**Request Body** (all fields are optional):
| Field | Type | Description |
|-------|------|-------------|
| categoryType | String | Category name |
| isFeature | Boolean | Whether the category is featured |
| imageURL | File | Category image |

**Example Request**:

```
PATCH http://localhost:3000/v1/api/category/updateCategory/648d7f7ec64d9548a9b9778a
Content-Type: multipart/form-data

{
  "isFeature": false,
  "imageURL": file
}
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "648d7f7ec64d9548a9b9778a",
    "categoryType": "Furniture",
    "imageURL": "https://res.cloudinary.com/example/image/upload/v1686940286/categories/furniture-updated.jpg",
    "isFeature": false,
    "productCount": 0,
    "createdAt": "2025-06-02T12:30:06.693Z",
    "updatedAt": "2025-06-02T13:11:26.123Z"
  },
  "message": "Category updated successfully"
}
```

**Error Responses**:

- `404 Not Found`: Category not found
- `409 Conflict`: Category type already exists
- `500 Internal Server Error`: Something went wrong while updating category

## Hero Banner API

### Create Hero Banner

- **Endpoint**: `POST /herobanner/create`
- **Content-Type**: `multipart/form-data`
- **Description**: Creates a new hero banner
- **Authorization**: None

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Banner title |
| bannerImage | File | Yes | Banner image |
| description | String | No | Banner description |
| isActive | Boolean | No | Whether the banner is active (default: false) |

**Example Request**:

```
POST http://localhost:3000/v1/api/herobanner/create
Content-Type: multipart/form-data

{
  "title": "Summer Collection",
  "description": "Check out our latest summer collection",
  "isActive": true,
  "bannerImage": file
}
```

**Success Response (201 Created)**:

```json
{
  "statusCode": 201,
  "data": {
    "_id": "648d9f9ec64d9548a9b9778e",
    "title": "Summer Collection",
    "description": "Check out our latest summer collection",
    "bannerImageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/banners/summer.jpg",
    "isActive": true,
    "createdAt": "2025-06-02T14:38:06.693Z",
    "updatedAt": "2025-06-02T14:38:06.693Z",
    "__v": 0
  },
  "message": "Hero Banner created successfully"
}
```

**Error Responses**:

- `400 Bad Request`: Title or banner image is required
- `500 Internal Server Error`: Something went wrong while creating a new hero banner

### Get All Active Hero Banners

- **Endpoint**: `GET /herobanner/active`
- **Description**: Retrieves all active hero banners
- **Authorization**: None

**Example Request**:

```
GET http://localhost:3000/v1/api/herobanner/active
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "648d9f9ec64d9548a9b9778e",
      "title": "Summer Collection",
      "description": "Check out our latest summer collection",
      "bannerImageURL": "https://res.cloudinary.com/example/image/upload/v1686938286/banners/summer.jpg",
      "isActive": true,
      "createdAt": "2025-06-02T14:38:06.693Z",
      "updatedAt": "2025-06-02T14:38:06.693Z"
    }
    // More active banners...
  ],
  "message": "Active Hero Banners fetched successfully"
}
```

**Error Response**:

- `500 Internal Server Error`: Error while fetching active hero banners

### Update Hero Banner

- **Endpoint**: `PATCH /herobanner/update/:id`
- **Content-Type**: `multipart/form-data`
- **Description**: Updates an existing hero banner
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | Hero Banner ID |

**Request Body** (all fields optional):
| Field | Type | Description |
|-------|------|-------------|
| title | String | Banner title |
| subtitle | String | Banner subtitle |
| description | String | Banner description |
| primaryCTA | Object | Primary call-to-action { text: String, link: String } |
| secondaryCTA | Object | Secondary call-to-action { text: String, link: String } |
| images | Files | Up to 4 banner images |
| isActive | Boolean | Whether the banner is active |

**Example Request**:

```
PATCH http://localhost:3000/v1/api/herobanner/update/648d9f9ec64d9548a9b9778e
Content-Type: multipart/form-data

{
  "title": "Updated Summer Collection",
  "isActive": false,
  "primaryCTA": {
    "text": "Shop Now",
    "link": "/summer-collection"
  },
  "images": [file1, file2]
}
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "648d9f9ec64d9548a9b9778e",
    "title": "Updated Summer Collection",
    "subtitle": "Existing subtitle",
    "description": "Existing description",
    "primaryCTA": {
      "text": "Shop Now",
      "link": "/summer-collection"
    },
    "images": [
      "https://res.cloudinary.com/example/image/upload/v1686938286/banners/summer1.jpg",
      "https://res.cloudinary.com/example/image/upload/v1686938287/banners/summer2.jpg"
    ],
    "isActive": false,
    "createdAt": "2025-06-02T14:38:06.693Z",
    "updatedAt": "2025-06-02T15:45:22.123Z"
  },
  "message": "Hero banner updated successfully"
}
```

### Delete Hero Banner

- **Endpoint**: `DELETE /herobanner/delete/:id`
- **Description**: Deletes a hero banner
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | Hero Banner ID |

**Example Request**:

```
DELETE http://localhost:3000/v1/api/herobanner/delete/648d9f9ec64d9548a9b9778e
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Hero banner deleted successfully"
}
```

### Get Hero Banner by Title

- **Endpoint**: `GET /herobanner/title/:title`
- **Description**: Retrieves a hero banner by its title
- **Authorization**: None

**URL Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| title | String | Banner title (case-insensitive) |

**Example Request**:

```
GET http://localhost:3000/v1/api/herobanner/title/summer
```

**Success Response (200 OK)**:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "648d9f9ec64d9548a9b9778e",
    "title": "Summer Collection",
    "subtitle": "Hot Deals for Summer",
    "description": "Check out our latest summer collection",
    "primaryCTA": {
      "text": "Shop Now",
      "link": "/summer-collection"
    },
    "secondaryCTA": {
      "text": "Learn More",
      "link": "/about-summer-collection"
    },
    "images": [
      "https://res.cloudinary.com/example/image/upload/v1686938286/banners/summer1.jpg",
      "https://res.cloudinary.com/example/image/upload/v1686938287/banners/summer2.jpg"
    ],
    "isActive": true,
    "createdAt": "2025-06-02T14:38:06.693Z",
    "updatedAt": "2025-06-02T14:38:06.693Z"
  },
  "message": "Hero banner fetched successfully"
}
```

**Error Responses for All Hero Banner Endpoints**:

- `400 Bad Request`: Invalid or missing required parameters
- `404 Not Found`: Hero banner not found
- `409 Conflict`: Banner with this title already exists
- `500 Internal Server Error`: Server-side error

## Common Error Response Format

All error responses follow this format:

```json
{
  "statusCode": xxx,
  "message": "Error description",
  "success": false
}
```

Common error status codes:

- `400 Bad Request`: Invalid or missing required parameters
- `404 Not Found`: Requested resource not found
- `409 Conflict`: Resource already exists
- `500 Internal Server Error`: Server-side error
