
# eVitalrx Assignment

## User Authentication System

This project is a comprehensive user authentication system that includes functionalities like user registration, login, logout, OTP generation and sending via email, forgot password, reset password, and user profile updates. It is built using modern web development technologies to ensure security and ease of use.

## Features

- **User Registration**: Allow users to create an account using their email and password.
- **Login**: Users can log in to their accounts using their credentials.
- **Logout**: Securely log users out of the system.
- **OTP Generation and Email**: Generate a one-time password (OTP) and send it to the user's registered email for verification purposes.
- **Forgot Password**: Allows users to reset their passwords if they forget them by sending a reset link or OTP to their email.
- **Reset Password**: Securely reset the password using a link or OTP sent to the user's email.
- **User Profile Update**: Enable users to update their profile information, such as name, email, and password.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any other preferred database)
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Email Service**: Nodemailer or any other email service API (like SendGrid)

## Installation
## Installation Instructions
### Prerequisites
- Node.js installed on your local machine.
- MySQL Workbench or any SQL platform installed.
### Clone the Repository

Install my-project with npm

```bash
 git clone https://github.com/Vaibhav0209/evital.git

```

### Frontend Setup

1.Move to the client directory

```bash
cd client

```

2.Install dependencies

```bash
yarn add

```

3.Run the frontend project:

```bash
yarn start

```

### Backend Setup

1.Move to the server directory

```bash
cd server

```

2.Install dependencies

```bash
yarn add

```

3.Run the Backend project:

```bash
yarn run dev

```

### Database Setup
1.Run database migrations

```bash
yarn sequelize-cli db:migrate
```

## Usage

### User Registration

1. Navigate to the registration page.
2. Fill in the required fields (e.g., email, password).
3. Click the **Register** button.
4. A verification email with an OTP will be sent to the provided email address.

### Login

1. Navigate to the login page.
2. Enter your email and password.
3. Click the **Login** button to access your account.

### Logout

1. Click the **Logout** button in the application to securely log out.

### OTP Verification

1. Upon registration, check your email for the OTP.
2. Enter the OTP in the verification form on the application.

### Forgot Password

1. Navigate to the **Forgot Password** page.
2. Enter your registered email address.
3. A reset link or OTP will be sent to your email.

### Reset Password

1. Click the reset link or enter the OTP sent to your email.
2. Enter a new password and confirm it.
3. Submit the form to reset your password.

### Update Profile

1. Navigate to the **Profile** page after logging in.
2. Update your information as needed.
3. Click the **Save** button to update your profile.




## Screenshots
![Home](https://github.com/user-attachments/assets/b736ab65-9eaf-4f29-bfbb-ced8dfebfb71)
![Register](https://github.com/user-attachments/assets/c807ff84-cf35-44dd-acb6-51067a0f242e)
![Login](https://github.com/user-attachments/assets/a94e492a-2e3b-4011-9969-39f89af8c06d)
![OTPPage](https://github.com/user-attachments/assets/377a699e-07a9-465f-9fd0-aa2412f1bd01)
![OTP_email](https://github.com/user-attachments/assets/c146fc6a-277f-4069-9d35-5039a44d61fd)
![Profile](https://github.com/user-attachments/assets/07ba7f4d-96ef-4c19-b3f2-62fb071d5962)
![UpdatePage](https://github.com/user-attachments/assets/f41280b8-992d-4593-82d4-4570da34e33f)
![forgotPassword](https://github.com/user-attachments/assets/480b3b77-10a5-44f1-a03b-5578133856f6)
![link_send](https://github.com/user-attachments/assets/8eb76c4c-5848-40e6-9ac0-aae1d7213e75)
![Link_email](https://github.com/user-attachments/assets/e403f8bf-9067-4b33-a701-9936764b4983)
![Reset-password](https://github.com/user-attachments/assets/ea5cc002-85f2-4c94-8bab-39902658fe21)
![pagenotfound](https://github.com/user-attachments/assets/9b097ece-9352-4e77-8e7f-db53ed6071ce)

