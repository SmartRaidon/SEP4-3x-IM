"# SEP4-3x-IM" 

## Project Overview

This project is a frontend application built with React and Vite as part of the fourth semester project.  
The application communicates with a backend API and includes authentication, state management, and unit testing.

## Tech Stack

- React
- Vite
- JavaScript
- React Router / HashRouter
- Fetch API
- Vitest (unit testing)
- CSS

## Getting Started

1. Clone the repository
git clone https://github.com/A-Emilia/SEP4-3x-IM.git

2. Run docker desktop

3. Start frontend app in container
docker compose up
or if you get any errors: docker compose up --build --renew-anon-volumes

5. Run tests
npm run test

## Environment Variables
In the sep4-react-app folder
Create a `.env` file:

VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:5019

## Project Structure

src/
│── app
│── features/
    │── auth/
        │── api/
        │── components/
        │── context/
        │── hooks/
        │── mocks/
        │── pages/
        │── services/
        │── tests/
        │── utils/
    │── layout/
        │── components/
        │── mocks/
        │── pages/
    │── measurements/
        │── api/
        │── components/
        │── hooks/
        │── mocks/
        │── pages/
        │── tests/
    │── scenarios/
        │── api/
        │── components/
        │── mocks/
        │── pages/
│── tests/
│── index.css
│── main.jsx

## Testing

We use Vitest and React Testing Library for unit tests.

Tests cover:
- Authentication logic
- Components rendering
- API service functions

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Responsive UI
- Unit tested components and services

## Backend

This frontend connects to a REST API built with [your backend tech].

Main endpoints:
- /auth/login
- /auth/register
- /measurements/?roomId=${roomId}
- /scenarios/?roomId=${roomId}