# Groupomania

## Seventh project with Openclassrooms

![Screenchot-preview](./client/public/assets/img/preview.png)

#### Back

-   CRUD on user & posts
-   Authentification
-   Upload image

#### Front

-   Authentification
-   Profil update
-   Feed
-   Like/Unlike
-   CRUD post
-   CRUD comment
-   POST Form
-   Video integration
-   Image integration

---

### Back config :

-   Create `.env` file inside `/config/` within the following data
    -   PORT= `your localhost port`
    -   CLIENT_URL= `your client url`
    -   DB_HOST = `your DB host`
    -   DB_USER = `your DB ID`
    -   DB_PASSWORD = `your DB password`
    -   DB_NAME = `your DB name`
    -   TOKEN_SECRET= `your random secret key`

---

### Front config :

-   Create a `.env` file within the server URL :
    -   REACT_APP_API_URL= `your server url`

---

## Setup

To run this project, install it locally using npm:

```
$ cd ./client
$ npm install
$ npm start
```

```
$ cd ./server
$ npm install
$ nodemon server
```
