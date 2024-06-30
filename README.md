# VirtuHR Backend

Welcome to the backend repository for VirtuHR! This backend server is built using Node.js to provide the necessary APIs for the VirtuHR human resources management system.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributors](#contributors)

## Introduction

The VirtuHR backend is designed to handle various functionalities required by the HR management system, including user authentication, job postings management, employee management, and feedback assessment. It provides RESTful APIs that interact with the frontend to ensure seamless interaction with the database and other services.

## Features

- **User Authentication:** Secure endpoints for user registration, login, and authentication.
- **Job Postings Management:** CRUD operations for managing job postings.
- **Employee Management:** APIs for creating, updating, and retrieving employee information.
- **Feedback Assessment:** Admin functionalities for creating and reviewing employee feedback assessments.
- **Middleware Integration:** Utilizes middleware for error handling, authentication, and request validation.

## Installation

To run the VirtuHR backend locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.
4. Create a `.env` file in the root directory of the project.
5. Add the following environment variables to the `.env` file:
  PORT=8081
6. Start the server by running `npm run watch`.
7. The server will be running on port 8081 by default.

## Usage

Once the backend server is running, it will be ready to handle requests from the VirtuHR frontend application You can find it [here](https://github.com/omar-a-eid/VirtuHR_frontend.git). Ensure that the frontend application is configured to communicate with the backend server (e.g., update API URLs).

## Contributors

<table>
  <tbody>
    <tr>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/omar-a-eid"><img src="https://avatars.githubusercontent.com/u/103126348?v=4" alt="Omar Ahmed"/><br /><sub><b>Omar Ahmed</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/esraaeliba"><img src="https://avatars.githubusercontent.com/u/130110027?v=4" alt="Esraa Ahmed"/><br /><sub><b>Esraa Ahmed</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/SalmaYousry01"><img src="https://avatars.githubusercontent.com/u/112441530?v=4" alt="Salma Yousry"/><br /><sub><b>Salma Yousry</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/mostafa-fakhr"><img src="https://avatars.githubusercontent.com/u/153079695?v=4" alt="Mostafa Fakhr"/><br /><sub><b>Mostafa Fakhr</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/KarimMohamedDesouki"><img src="https://avatars.githubusercontent.com/u/153070580?v=4" alt="Karim Mohamed"/><br /><sub><b>Karim Mohamed</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/YousefAlsayed4"><img src="https://avatars.githubusercontent.com/u/130420160?v=4" alt="Yousef El Sayed"/><br /><sub><b>Yousef El Sayed</b></sub></a></td>
    </tr>
  </tbody>
</table>

