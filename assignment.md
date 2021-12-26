# Mobile Apps - Device Creator Challenge

This challenge involves creating both a frontend as well as a backend for managing lab devices.

A device can be anything, from a computer to a Raspberry Pi to a small embedded microcontroller.

## The Backend

The backend (express app) exposes a clean API for the frontend to consume. It should provide routes for the following functions:

* Creation of a device
* Listing of the details of a specific device
* Listing of basic info of all devices
* Uploading an image

Except for the images, all this information should be stored in a database of your choice.

~You do not need to provide any authentication / authorization.~

The backend should provide routes for authentication and use Passport.js as authentication framework. Make sure to provide a route for:

* registering a new user (email, passport, firstname, lastname, avatar)
* logging in a user
* logging out a user
* a profile route with the details of the user (email, firstname, lastname, avatar)

Only an authenticated user should be able to access the routes for:

* creating a device
* listing details of a device
* uploading an image
* getting the current user's details

Make sure to provide a docker container for the backend.

Both these application can be hosted in this single github repo but should be split into separate directories.

## The Frontend

The frontend (Vue app) provides a nice user interface that allows the management of the devices.

Existing devices should be listed with basic information. A user should be able to request the details of each device.

A user should be allowed to create new devices with the following information (minimum but not limited to):

* name for the device
* some sort of GUID (retrieved from scanned QR code)
* a description
* a picture / image of the device
* a location (use GPS location service)

Registering a device should be achieved by embedding a URL inside a QR code which also contains the GUID of the device. Scanning the URL should automatically bring you to the registration page with the GUID filled in. If the device is already registered it should provide the details page of the device.

Uploading an image to the backend can be achieved using a package such as `multer`.

Provide the functionality for the user to be able to:

* register a new user account
* login
* logout
* a profile page with an avatar, firstname, lastname and email

Make sure to provide a docker container for the Vue app.

## Docker Compose

To allow all containers to be spun up easily, you should also provide a docker compose file. Place it in the root of this repository.

## Decent Readme

Provide a decent README for this project. Rename this `README.md` file to `assignment.md` and provide your own README.

Make sure the following topics are provided (minimally):

* Project Description with screenshots
* Author
* Service diagram (use draw.io or similar)
* How to setup
* API description
* Pitfalls / ToDo's / ...

## Evaluation

The following criteria will be taken into consideration when this assignment is evaluated.

| Criteria | Score |
| --- | :---: |
| README | 0 - 4 |
| RESTfull API | 0 - 4 |
| Image Upload | 0 - 2 |
| Authentication | 0 - 8 |
| QR code | 0 - 2 |
| Device GPS location | 0 - 2 |
| User friendliness | 0 - 4 |
| Creativity | 0 - 2 |
| Device creation | 0 - 4 |
| Device listing | 0 - 2 |
| Device details | 0 - 2 |
| Docker-compose | 0 - 2 |
| Docker frontend | 0 - 1 |
| Docker backend | 0 - 1 |
