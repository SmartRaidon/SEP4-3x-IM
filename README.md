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
git clone https://github.com/SmartRaidon/SEP4-3x-IM

2. Run docker desktop

3. Start frontend app in container
docker compose up
or if you get any errors: docker compose up --build --renew-anon-volumes

5. Run tests
npm run test

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