# Global Visit Tracker

## Description

Global Visit Tracker is a web application that allows users to keep track of the countries they have visited. The app enables users to add countries to their visited list, which is then displayed with the total number of visited countries. Built using Express.js for the server, PostgreSQL for data storage, and EJS for rendering dynamic content.

## Features

- Add countries to the visited list.
- Display the total number of visited countries.
- Handle errors gracefully for invalid or duplicate entries.

## Set up the PostgreSQL database

- Ensure PostgreSQL is installed and running.
- Create a database named **Web Dev**
- Set up tables **visitedCountries** and **countries** as required by application.

## Error Handling

- **Duplicate Country:** If attempt to add a country that has already been visited, an error message will be displayed.
- **Non-existent Country:** If you try to add a country that is not in the database, an error message will be shown.
