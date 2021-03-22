# UberFrontend

## Objective
Creating frontend react stack for Uber APP

### Maintainer 
Name: Naresh Agrawal, NUID: 001054600<br/>
Name: Akshay Babaji Phapale, NUID: 001316563

## Technology Stack
* React

## Prerequisites
* React
* npm
* Docker

## Running application locally
```
$ npm start
```

* Shutdown application locally
```
$ ctrl+c
```

## Build Docker image
```
$ docker build -t <image-name> .
```

## Run application by Docker image
```
$ docker run --rm -p 3000:80 <image-name>
```
The application should be running and listening for HTTP requests on port 3000 on localhost.
http://localhost:3000/