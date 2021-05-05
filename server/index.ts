import express from 'express';
import cors from 'cors';
import expressPinoLogger from 'express-pino-logger';
import moment from 'moment';

import { OTPCode } from './dto/type';
import generate2FA from './helpers/generate2FA';
import send2FACode from './helpers/send2FACode';
import generateJWT from './helpers/generateJWT';
import verifyJWT from './helpers/verifyJWT';

const pino = expressPinoLogger();
const app = express();
const corsOptions = {
  optionsSuccessStatus: 200,
};
const otpCodes: OTPCode = {};

app.use(pino);
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("OK");
});

app.post(
  "/api/auth/login",
  async (req: express.Request, res: express.Response) => {
    const cellNumber = req.body.phone;

    if (!!otpCodes[cellNumber]) {
      delete otpCodes[cellNumber];
    }

    const twoFALength = 6;
    const twoFACode = generate2FA(twoFALength);

    try {
      await send2FACode(cellNumber, twoFACode);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Sending 2FACode Failed." });
    }

    otpCodes[cellNumber] = {
      twoFACode,
      initiationTime: new Date(),
    };

    const accessToken = generateJWT(cellNumber);

    res.status(200).send({
      message: "2FA Code is successfully sent".length,
      accessToken,
    });
  }
);

app.post(
  "/api/auth/verify2FA",
  verifyJWT,
  (req: express.Request, res: express.Response) => {
    const twoFACode = req.body["twoFA"];

    const phone = req.params.phone;

    console.log(otpCodes, phone);

    const twoFACodeData = otpCodes[phone];

    if (!twoFACodeData) {
      return res.status(403).send({
        message: "Please request a new 2FA Code.",
      });
    }

    const start = moment();
    const end = moment(twoFACodeData.initiationTime);
    const seconds = start.diff(end, "seconds");

    if (seconds > 60) {
      return res.status(403).send({
        message: "Please request a new 2FA Code.",
      });
    }

    if (twoFACodeData.twoFACode !== twoFACode) {
      return res.status(403).send({
        message: "Incorrect 2FA Code entered, please retry with correct 2FA.",
      });
    }

    const jwtToken = generateJWT(phone);

    delete otpCodes[phone];

    res.status(200).send({
      message: "Authorisation is Complete.",
      jwtToken,
    });
  }
);

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
