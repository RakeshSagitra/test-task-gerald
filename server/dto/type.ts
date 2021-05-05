export interface OTPCode {
  [phone: string]: {
    twoFACode: string;
    initiationTime: any;
  };
}
