# Device creator Ben Boydens

Welcome this is the device creator app. This is an application where you can register all kinds of devices. You can view your devices and create new devices using a Vue frontend. To create and view new devices you will have to create an account.

Created by Ben Boydens for the class Mobile Apps for Vives Hogeschool.

## Service Diagram

![Schema](./img/diagram.png)

## How to setup

The project can be easily be set-up for development using Docker. Just run the following command in same directory as the docker-compose.yml file.
```
docker-compose up --build
```

---
Alternatively you can install everything locally. Install everything for the frontend and backend with.
```
npm install
```

Run the development server for the frontend.
```
npm run serve
```

Build the frontend.
```
npm build
```

Run the development server for the backend.
```
npm run dev
```

## Frontend

Vue frontend using the following dependencies.
- bcrypt
- dotenv
- express
- jsonschema
- lowdb
- multer
- passport

## Backend

Backend uses in total 11 different routes.

### Device Route

| Method | Route | Description | Authentication |
| ----------- | ----------- | ----------- | :-----------: |
| GET | /devices | Get a list of devices | ❌ |
| POST | /devices | Create a new device | ✔ |
| GET | /devices/{id} | Get a specific device with id | ✔ |

### User Routes
| Method | Route | Description | Authentication |
| ----------- | ----------- | ----------- | :-----------: |
| GET | /profile | Get the profile of the current logged in user | ✔ |
| POST | /register | Create a login | ❌ |
| POST | /login | Login to your account | ❌ |
| DELETE | /logout | Logout the current user | ❌ |

### Image Routes
| Method | Route | Description | Authentication |
| ----------- | ----------- | ----------- | :-----------: |
| GET | /images/{id} | Get a specific image with id | ❌ |
| POST | /images/upload | Upload a new image | ✔ |
| POST | /avatars | Upload an avatar image for your account | ❌ |
