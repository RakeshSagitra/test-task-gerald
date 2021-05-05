import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_CELL_NUMBER,
} from "../dto/constants";

const send2FACode = (cellNumber: string, twoFACode: string): any => {
  // require the Twilio module and create a REST client
  const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  return client.messages
    .create({
      to: cellNumber,
      from: TWILIO_CELL_NUMBER,
      body: `The 2FA Code for accessing Demo Application is ${twoFACode}, it is valid for 60 seconds.`,
    })
    .then((message: any) => console.log(message.sid));
};

export default send2FACode;
