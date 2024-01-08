# Restaurant


## Contents
1. [Main Information](#📜-Main-Information)
2. [Stack](#Stack)
3. [Installation and Usage](#Installation-and-Usage)
4. [Examples](#Examples)
   1. [Waiters](#Waiters)
   2. [Dishes](#Dishes)
   3. [Tables](#Tables)
   4. [Orders](#Orders)
    

____

## 📜 Main Information

This application can be useful for basic restaurant activity.
The massive amount of data was generated using Faker.js .
The application consists of four modules (including CRUD 
operations which allow you to create, read, edit, and delete data):

1. Waiters management.
2. Tables management. 
3. Dishes management.
4. Orders management.

In the orders management, a waiter can open an order 
to select a table and a waiter for it, add there some dishes
and then close it. The application will calculate the total amount of the bill.
____

## Stack

✅ HTML (JSX), CSS, SCSS, ANT DESIGN

✅ JavaScript ES6+

✅ React

✅ React Router

✅ Redux

✅ Redux Thunk

✅ Fetch API

✅ Express

✅ WebSocket

✅ Faker

✅ Webpack

____

## Installation and Usage

The project consists of the two parts (server and client).

**Installation:**

* Clone the repository: git clone https://github.com/reyand8/Restaurant-JS-Project.git

**Usage:**

* Server
    - Navigate to the server directory: cd mock-api-server-main
    - Install dependencies: npm install
    - Run the server: npm run start
____
____
* Application
    - Navigate to the project directory: cd restaurant-project 
    - Install dependencies: npm install
      - Run the project: npm run start
      - Open a browser and navigate to: http://localhost:3000
    - or
      - Run the project using webpack: npm run webpack-start
      - Open a browser and navigate to: http://localhost:8080
____
____
* You can also run both of them together:
  - Run the project: npm run start-all
  - Open a browser and navigate to: http://localhost:3000
____
## Examples

### Waiters
![waiters01.gif](restaurant-project%2FreadmeScr%2Fwaiters01.gif)
![waiters02.gif](restaurant-project%2FreadmeScr%2Fwaiters02.gif)

____
____
### Dishes
![dishes01.gif](restaurant-project%2FreadmeScr%2Fdishes01.gif)
![dishes02.gif](restaurant-project%2FreadmeScr%2Fdishes02.gif)

____
____
### Tables
![tables01.gif](restaurant-project%2FreadmeScr%2Ftables01.gif)

____
____
### Orders
![orders01.gif](restaurant-project%2FreadmeScr%2Forders01.gif)
![orders02.gif](restaurant-project%2FreadmeScr%2Forders02.gif)
