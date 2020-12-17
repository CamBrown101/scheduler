# Interview Scheduler

## Project Description

A React app for booking interviews with interviewers. As well as practise writting diffrent types of tests and setting up testing enviroments as well as setting up CircleCI for continious intergration.

## Features

- Select diffrent days and view interviews and available slots for that day.
- Have up to the moment indicators for how many slots are left in each day.
- Validation not allowing you to input empty fields.
- Users can create new interviews in an available time slot and pick an available interviewer from a list.
- Users can edit previously booked appointments.
- Users can cancel previously booked appointments.
- Users are shown an error if one occurs during saving or deleteing an appointment.
- AXIOS calls to the PostgeSQL database to update components.
- Used modes to switch between what the user sees on each slots card.
- Used a reducer to execute the diffrent user functions.
- Storybook enviroment for individual component testing.
- Jest and Testing Library for insertion testing.
- Cypress for end to end testing.
- CircleCI for continous intergration and testing each merge request before sending the product to the production site on netlify.

## Live Sites

- Live site: https://scheduler-cam-brown.netlify.app/

- API site: https://scheduler-cam-brown.herokuapp.com/api

## Screen Shots

![4 diffrent modes of an interview container](https://github.com/CamBrown101/scheduler/blob/master/Docs/4-slot-views.png?raw=true)

![The list of days an the diffrent displays they can be in as well as the available slots](https://github.com/CamBrown101/scheduler/blob/master/Docs/Days-view.png?raw=true)

![A full screen screen shot of the app](https://github.com/CamBrown101/scheduler/blob/master/Docs/Full-page.png?raw=true)

## Getting Started

- Fork and clone API from 'https://github.com/CamBrown101/scheduler-api'

- Install dependencies with 'npm install'.

- Start the APP with 'npm start'.

## Running Jest Test Framework

- Start Jest in listen mode with 'npm test'.

## Running Storybook Visual Testbed

- Start Storybook in listen mode with 'npm run storybook'.

## Running Cypress

- Install cypress 'npm install -g cypress'
- Run schedular_api in with 'NODE_ENV=test npm start'
- Reset data with 'http://localhost:8001/api/debug/reset'
- Add 'cypress": "cypress open -P .' to your scripts in package.json
- Run cypress with 'npm run cypress'

## Stack

- React
- Node
- Axios
- Express
- SASS
- CSS
- HTML
- PostgreSQL
- Jest
- Storybook
- Cypress
- CircleCI

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PostgreSQL 6.x
- Babel/core 7.4.3 or above
- Storybook/addon-actions": ^5.0.10
- Storybook/addon-backgrounds": ^5.0.10
- Storybook/addon-links": ^5.0.10
- Storybook/addons ^5.0.10
- Storybook/react ^5.0.10
- Testing-library/jest-dom ^4.0.0
- Testing-library/react ^8.0.9
- Babel-loader ^8.0.5
- Node-sass ^4.12.0
- React-test-renderer 16.9.0
