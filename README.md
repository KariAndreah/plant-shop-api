# Welcome to Kari's Plant Shop

### Get all Plants
`GET /plants`

### Get all Plants by ID
`GET /plants/:id`

### Make a purchase
`POST /plants/:id/purchase`
{
    "purchaser_name":"test name",
    "purchaser_address": "123 test address",
    "purchase_quantity": 4
}

### Get all Orders
`GET /orders`

### Get all Orders by ID
`GET /orders/:id`