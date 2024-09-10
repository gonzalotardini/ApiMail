# Email Sending API with Node.js and Nodemailer

This is a simple RESTful API built with **Express.js** and **Nodemailer** to send emails programmatically. The API is designed to work with CORS for specific frontend clients and uses environment variables to store sensitive email credentials.

## Features

- Send emails via POST requests
- Uses **Nodemailer** for sending emails through Gmail
- CORS configuration to allow specific frontend origins
- Supports both development and production environments

## Requirements

- **Node.js** (version >= 12.x)
- **npm** or **yarn** for dependency management

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/email-sending-api.git

2. Navigate to the project directory:
    ```bash
    cd email-sending-api
    
3. Install the dependencies:
   npm install

4. Set up environment variables. Create a .env file in the root of the project and configure the following variables:
   ```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-password
   PORT=3000
  Replace your-email@gmail.com and your-password with your Gmail credentials (or use an app-specific password if you have 2-factor authentication enabled).
   
## Usage
1. Start the server:
    ```bash
    npm start
    
2. The API will be available at http://localhost:3000.
   
3. To send an email, make a POST request to the /send-email endpoint with the following JSON body:
   ```bash
   {
     "to": "recipient@example.com",
      "subject": "Hello World",
      "text": "This is a test email"
   }

  You can test the API with Postman or curl:
  ```bash
    curl -X POST http://localhost:3000/send-email \
    -H "Content-Type: application/json" \
    -d '{
      "to": "recipient@example.com",
      "subject": "Hello World",
      "text": "This is a test email"
    }'
```

## CORS Configuration
This API has CORS enabled for specific origins. In the app.js file, the following origins are allowed:

- https://giovanelli-tardini-web.vercel.app (production)
- http://localhost:8080 (development)
Requests from other origins will be blocked unless you update the allowedOrigins array in the code.

## Environment Variables
- EMAIL_USER: Your email address used for sending emails.
- EMAIL_PASS: Your email password or app-specific password if 2FA is enabled.
- PORT: The port the API will run on. Default is 3000.
## API Endpoints
POST /send-email
Description: Sends an email to the specified recipient.

## Request Body:

   
| Field |  Type  | Description |
|:-----|:--------:|------:|
| to   | String | The recipient's email address. |
| subject   |  String  |  The subject of the email. |
| text   | String | The plain text body of the email. |

**Response**:

- 200 OK if the email is sent successfully.
- 500 Internal Server Error if there is an issue with the email sending process.
Running in Production
For production, ensure you are using a secure method to store environment variables (such as in a .env file, or using a cloud provider's secrets manager). Also, set up your email service correctly for production-level usage, considering email limits on free services like Gmail.









