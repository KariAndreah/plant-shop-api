# Welcome to Kari's Plant Shop
App is deployed on [Heroku](https://plant-shop-api-5e4b0fdc66a5.herokuapp.com/) using Heroku Postgres
Recommend accessing API using Postman!

### Get all Plants
`GET /plants`

### Get all Plants by ID
`GET /plants/:id`

### Make a purchase
`POST /plants/:id/purchase`
``` Example Post Request: 
{
    "purchaser_name":"test name",
    "purchaser_address": "123 test address",
    "purchase_quantity": 4
}
```

### Get all Orders
`GET /orders`

### Get all Orders by ID
`GET /orders/:id`

