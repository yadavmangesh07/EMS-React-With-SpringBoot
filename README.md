# Employee Management System

![Employee Management System](path_to_your_image.png)

## Overview

This project is an Employee Management System built using Spring Boot for the back end and React for the front end. The application includes features such as user authentication (sign-in, sign-up, forgot password) and CRUD operations for employee details. Tailwind CSS and Material UI are used for styling the application.

## Features

- **User Authentication**: Sign-in, sign-up, and forgot password functionalities.
- **Employee Management**: Add, edit, and delete employee details.

## Technologies Used

- **Front End**: React, Tailwind CSS, Material UI
- **Back End**: Spring Boot, Hibernate
- **Database**: PostgreSQL
- **Development Tools**: Spring Tool Suite (STS), pgAdmin

## Installation

### Prerequisites

- Node.js
- Java JDK
- PostgreSQL
- Spring Tool Suite (STS)

### Front End

1. Clone the repository:
    ```bash
    git clone https://github.com/yadavmangesh07/EMS-React-With-SpringBoot
    cd EMS-React-With-SpringBoot/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

### Back End

1. Configure the database:
    - Create a PostgreSQL database named `employee_management`.
    - Update the `application.properties` file with your PostgreSQL credentials:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/employee_management
        spring.datasource.username=your_username
        spring.datasource.password=your_password
        ```

2. Build and run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

## Usage

1. Access the front-end application at `http://localhost:5173`.
2. Interact with the application to manage employee details and user authentication.

## API Endpoints

### Authentication

- **POST /api/auth/signin**: User sign-in
- **POST /api/auth/signup**: User sign-up
- **POST /api/auth/forgot-password**: Forgot password

### Employee Management

- **GET /api/employees**: Retrieve all employees
- **POST /api/employees**: Add a new employee
- **PUT /api/employees/{id}**: Update an employee
- **DELETE /api/employees/{id}**: Delete an employee

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the creators of React, Spring Boot, Tailwind CSS, Material UI, and all other open-source projects that made this project possible.


## Contact

- LinkedIn: [Mangesh Yadav](https://www.linkedin.com/in/your-profile)
