# Timart

This is a Timart Node.js Sql Express based RESTful Api Project.

# Technologies used
-   Node.js
-   Express.js
-   Restful API
-   Sequelize
-   Graphql
-   APIs Authorization (JWT)


# How to use

## 1. Clone Project into your local machine

```
https://github.com/nelsoniseru/timart_nelson_iseru_backend.git
```



## 2. Connecting to Database

### DATABASE:

Please make sure mySQL Server software is installed.
start your mysql server

> For more details about Mysql, click [here](https://mysql.com).

### create a dot env file
fill in the values for the variables
HOST = 

DIALECT=

SERVER_PORT=

DB_PORT=

DB_NAME=

DB_USER=

DB_PASSWORD=

DEV=dev

SECRET_KEY = 

EXPIRES_IN= 


### install all packages
```
yarn install
```

## 3. Start project
```
 yarn run start:dev
```

# APIs Authorization

## Some APIs are protected by accessToken (JWT):

## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.
```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user login sucessfully, a unique accessToken will be returned.

# Level access

## protected routes
 
| APIs                                                   | Method |   AccessToken|
| ------------------------------------------------------ | ------ | ------------ |
| http://localhost:3002/api/v1/orders/create-order       | POST   |  Required    |
|  http://localhost:3002/api/v1/orders/get-user-order    | GET    |  Required    |
|  http://localhost:3002/api/v1/orders/get-most-orders   |  GET   |  Required    |
|  http://localhost:3002/api/v1/users/deposit            |  POST  | Required     |



# Available APIs

## User route


| APIs                                          | Method |         Desc          |
|--------------------------------------------   |--------|---------------------- |
|http://localhost:3002/api/v1/users/register    |  POST  | Register user account |
| http://localhost:3002/api/v1/users/login      |  POST  | User login            |
| http://localhost:3002/api/v1/users/deposit    |  POST  | Deposit user          |
| http://localhost:3002/api/v1/users/get-user/5 |  GET   | Get user Order        |
           |
## Order route

| APIs                                                  | Method | Desc                    |
| ------------------------------------------------------| ------ |-------------------------|
| http://localhost:3002/api/v1/orders/create-order      | POST   | Create order for user   |      
| http://localhost:3002/api/v1/orders/get-user-order    | GET    |  Find user order       | 
| http://localhost:3002/api/v1/orders/get-most-orders   | GET    | Get user with most order|     

# Models
## User model
| Field           | Type   | 
|-----------------|--------|
| id              | int    |
| email           | string |
| password        | string | 
| wallet          | decimal|  


## Order model

| Field           | Type     | 
|-----------------|----------|
| id              | int      |
| transaction_id  | string   |
| userId          | int      | 
| total_amount    | decimal  | 
| order_date      | datetime | 
| item_name       | string   | 

## E-R Model

> click here to see the E-R model [here](https://app.dbdesigner.net/designer/schema/564966).
## Postman documentation
> click here to see the Postman documentation [here](https://documenter.getpostman.com/view/13945163/2s9YRCVqou).

## Developer
| Name            | Email                    | 
|-----------------|--------------------------|
| Nelson Iseru    | nelsoniseru08@gmail.com  |
| Phone Number    | +2349026915561           |
| Position        | Backend developer        |



