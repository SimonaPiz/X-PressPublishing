# X-Press Publishing

## Project Overview

In this capstone project, you will build all of the routing and database logic for an internal tool for a comic book publishing company called X-Press Publishing.

The X-Press Publishing internal tool should allow users to:
- Create, view, and update artists
- Create, view, update, and delete comic book series
- Create, view, update, and delete issues of a specific comic book series

You can view all of this functionality in action in the video below:

<video width="100%" height="100%" controls>
   <source src="https://s3.amazonaws.com/codecademy-content/programs/build-apis/solution-videos/XPressPublishing480.mov" type="video/mp4">
 The markdown processor does not support the video tag.
</video>

## How To Begin

To start, download the starting code for this project <a href="https://s3.amazonaws.com/codecademy-content/programs/build-apis/projects/capstone-project-1-x-press-publishing.zip" target="_blank">here</a>. After downloading the zip folder, double click it to uncompress it and access the contents of this project.

To view your local version of the site, open **index.html** in Google Chrome.

## Implementation Details

To complete this project, I needed to create the database tables and API routes specified. 

### Setup
- [x] Setup Project
- [x] Setup Server. Create and export the Express app
- [x] Create and export API Router for `/api`

✔ [#2 issue](https://github.com/SimonaPiz/X-PressPublishing/issues/2)


### Create Database Table

✔ [#3 issue](https://github.com/SimonaPiz/X-PressPublishing/issues/3)

- [x] **Artist**
  - id - Integer, primary key, required
  - name - Text, required
  - date_of_birth - Text, required
  - biography - Text, required
  - is_currently_employed - Integer, defaults to `1`

- [x] **Series**
  - id - Integer, primary key, required
  - name - Text, required
  - description - Text, required

- [x] **Issue**
  - id - Integer, primary key, required
  - name - Text, required
  - issue_number - Text, required
  - publication_date - Text, required
  - artist_id - Integer, foreign key, required
  - series_id - Integer, foreign key, required


### Create Route Paths

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
