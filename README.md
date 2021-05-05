### Submit Note

***API***:

- Trilio is used for sending SMS, account is created and credentials are present at pat:- /server/dto/constants.ts

- JWT is used for generating Access Tokens and authorization.

***Front-end***:

- 3 Routes are used for the flow:-
   - Home Page - It comprises of text field for entering the phone number, redirects to /2fa when submitted.
   - 2FA Page - Here user will be receiving and entering the valid 2FA Code. redirects to /welcome.
   - Welcome Page - User will be able to access this page only if 2fa is correct.

## Development Steps


**Front-end** 

   Used typescript to design Frontend application.

**API** 

   Two HTTP Routes are used at the BE:-
    - Login : POST API for receiving the phone number and sending the 2FA Code using Trilio
    - Verify2FA : POST API for sending 2FA in body, accessToken received from previous API is required for identification and authorisation

### Application Startup

**backend:**
- Start the backend app first
- Use the command `npm install` and `npm run server` to start the server at port 3001.

**frontend:**
- Use the command `npm run start` to start the Front-end Application on port 3000.