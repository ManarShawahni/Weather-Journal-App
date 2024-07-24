# Weather Journal App ☔

https://github.com/user-attachments/assets/8a8fd626-5d30-4e02-8073-00e2001a470c

## Description
This project was designed as a hands-on application of working with Web APIs and asynchronous JavaScript code, demonstrating the capabilities of modern JavaScript alongside server-side development with Express.js. The core functionality centers around the OpenWeatherMap API, which the app uses to fetch weather data based on user-entered ZIP codes. The application dynamically updates the UI to display the fetched weather data, providing an interactive experience.

### Key Features:
- **Dynamic UI Updates**: The front-end of the app dynamically updates to show weather data and user-submitted feelings, showcasing the use of DOM manipulation in JavaScript.
- **Asynchronous JavaScript**: Uses `async` and `await` alongside `fetch` API for efficient asynchronous operations, making API requests to retrieve weather data without blocking the UI.
- **Express.js Server**: Implements a simple back-end with Node.js and Express.js to serve the application and handle API requests and responses. This includes setting up server-side routes to manage data flow.
- **Data Storage**: Temporary data storage on the server-side to hold user inputs and API responses, demonstrating the use of server-side logic in handling data.

## Technologies Used:
- **HTML/CSS**: For structuring and styling the application.
- **JavaScript (ES6+)**: For client-side scripting and interaction.
- **Node.js and Express.js**: For the server-side setup, creating routes, and server logic.
- **OpenWeatherMap API**: External API to fetch real-time weather data.
- **Git**: For version control.

## Setup and Installation
- To run this project, download or clone the repository locally.
- Navigate to the project directory in your command line:
  ```bash
  cd yourpath
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the server:
  ```bash
  node server.js
  ```

- Open your web browser and visit http://localhost:3001/ to view the app.

# How to Use
- Enter a valid ZIP code into the input field (the zip code only for U.S. but you can change the API settings).
- Write down your current feelings in the textarea provided. and Click the "Generate Weather" button to see the results.


