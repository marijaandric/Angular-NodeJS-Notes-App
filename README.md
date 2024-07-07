# Notes Application

This is a simple notes management application built using Angular for the frontend, Node.js for the backend, and MongoDB for the database.

## Features

- Create, read, update, and delete notes
- Prioritize notes
- User-friendly interface

## Technologies Used

- **Frontend:** Angular
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** Mongoose (for MongoDB object modeling), Angular Services (for HTTP requests)

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. **Clone the repository:**
2. **Backend setup:**

    ```bash
    cd back
    npm install
    ```

    Create a `.env` file in the `backend` directory and add your MongoDB connection string:

    Start the backend server:

    ```bash
    node index.js
    ```

3. **Frontend setup:**

    Open a new terminal window and navigate to the `frontend` directory:

    ```bash
    cd front
    npm install
    ```

    Start the frontend server:

    ```bash
    ng serve
    ```

4. **Access the application:**

    Open your browser and navigate to `http://localhost:4200`.

## Usage

- **Login or register**
- **Create Note:** Click on the "Add Note" button, fill in the details, and save.
- **View Notes:** Notes are listed and filtered on the homepage.
- **Edit Note:** Click on the edit icon next to a note to update its details.
- **Delete Note:** Click on the delete icon next to a note to remove it.

## Project Structure

### Backend (Node.js, Express.js)

- `index.js` - Entry point for the backend server
- `routes/note.js` - Defines the API endpoints for notes
- `models/note.js` - Mongoose model for notes
- `service/note.js` - Contains the logic for note operations

### Frontend (Angular)

- `src/app/app.module.ts` - Main module file
- `src/app/components` - Contains Angular components (homepage, sticky-notes, etc.)
- `src/app/services/note.service.ts` - Angular service for HTTP requests to the backend
