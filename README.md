# X-Press Publishing
> I build all of the routing and database logic for an internal tool for a comic book publishing company

<img src="https://github.com/SimonaPiz/X-PressPublishing/assets/91121660/caf4d764-9f00-4d7d-b8b2-49d5f801801e" width="600px" alt="preview" title="preview"/>

## Table of Contents
* [Project Overview](#project-overview)
* [Implementation Details](#implementation-details)
* [Testing](#testing)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Acknowledgements](#acknowledgements)
* [Author](#author)

## Project Overview

In this capstone project, you will build all of the routing and database logic for an internal tool for a comic book publishing company called X-Press Publishing.

The X-Press Publishing internal tool should allow users to:
- Create, view, and update artists
- Create, view, update, and delete comic book series
- Create, view, update, and delete issues of a specific comic book series

You can view all of this functionality in action in the video below: [▶](https://s3.amazonaws.com/codecademy-content/programs/build-apis/solution-videos/XPressPublishing480.mov)

## Implementation Details

To complete this project, I needed to create the database tables and API routes specified. 

- [x]  Setup
  - Setup Project
  - Setup Server. Create and export the Express app
  - Create and export API Router for `/api`

  ✔ [#2 issue](https://github.com/SimonaPiz/X-PressPublishing/issues/2)


- [x]  Create Database Tables

  ✔ [#3 issue](https://github.com/SimonaPiz/X-PressPublishing/issues/3)

  - **Artist**
    - id - Integer, primary key, required
    - name - Text, required
    - date_of_birth - Text, required
    - biography - Text, required
    - is_currently_employed - Integer, defaults to `1`

  - **Series**
    - id - Integer, primary key, required
    - name - Text, required
    - description - Text, required

  - **Issue**
    - id - Integer, primary key, required
    - name - Text, required
    - issue_number - Text, required
    - publication_date - Text, required
    - artist_id - Integer, foreign key, required
    - series_id - Integer, foreign key, required


- [x]  Create Route Paths

  ✔ [#4 issue](https://github.com/SimonaPiz/X-PressPublishing/issues/4)

  **/api/artists**
    - GET
    - POST
  
  **/api/artists/:artistId**
    - GET
    - PUT
    - DELETE

  **/api/series**
    - GET
    - POST

  **/api/series/:seriesId**
    - GET
    - PUT
    - DELETE

  **/api/series/:seriesId/issues**
    - GET
    - POST

  **/api/series/:seriesId/issues/:issueId**
    - PUT
    - DELETE


## Testing

A testing suite has been provided. 

  ✔ All Test Passed

  ![Test Results](https://user-images.githubusercontent.com/91121660/280709703-75038295-94bf-482d-9a19-6c60fdf7e0d4.png)

## Setup
In the root directory of the project run
```
$ npm  install
```
To view a local version of the site, open **index.html** in the browser.

## Technologies Used
  - React 15
  - react-router-dom 4
  - mocha 10
  - chai 4
  - express 4
  - sqlite3 5
  - body-parser 1
  - cors 2
  - errorhandler 1

## Acknowledgements

This project comes from the [Codecademy's Create a Back-End with JavaScript](https://www.codecademy.com/learn/paths/create-a-back-end-app-with-javascript) course.

## Author

- [Simona Pizio](https://github.com/SimonaPiz)
