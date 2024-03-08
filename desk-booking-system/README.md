DeskNow - Desk Booking System

DeskNow is a web application developed using React, TypeScript, and Tailwind CSS for managing desk bookings in various rooms. This README file provides essential information for understanding and using the application effectively.
Table of Contents

    Introduction
    Features
    Installation
    Usage
    API Integration
    Contributing
    License

Introduction

DeskNow is a desk booking system designed to facilitate the management of workstations within different rooms. Admin users can create rooms, define workstations as FixDesk or FlexDesk, and manage reservations. Users can book available desks and view their booking history.
Features

    User Authentication: Users can register and log in securely. Authentication tokens are stored locally to keep users logged in.
    Room Management: Admin users can create rooms and define workstations.
    Desk Booking: Users can book available desks, with FixDesks requiring admin confirmation.
    Reservation Management: Users can view their upcoming and past reservations. Admins can view and manage all reservations, including fixing desk bookings.
    Favorites: Users can add desks to their favorites for quick access and booking.
    Profile Management: Users can update their profile information and log out securely.
    Responsive Design: The application is responsive and supports various screen sizes for seamless user experience.

Installation

To run DeskNow locally, follow these steps:

    Clone the repository:

    bash

git clone https://github.com/levinset/DeskNow.git

Navigate to the project directory:

bash

cd DeskNow

Install dependencies:

bash

    npm install

Usage

To start the development server, run:

bash

npm run dev

The application will be available at http://localhost:3000.
API Integration

DeskNow integrates with the backend API for managing rooms, desks, and reservations. Ensure the API endpoints are correctly configured in the api directory.
Contributing

Contributions to DeskNow are welcome! Here's how you can contribute:

    Fork the repository.
    Create a new branch for your feature: git checkout -b feature-name.
    Make your changes and commit them: git commit -am 'Add new feature'.
    Push your changes to the branch: git push origin feature-name.
    Submit a pull request.

Please ensure your code follows the existing code style and includes appropriate tests.
License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to reach out if you have any questions or need further assistance with DeskNow!
