const generate2FA = (codeLength: number): string => {
  const twoFAString = "0123456789";
  let twoFaCode = "";

  for (let i = 1; i <= codeLength; i++) {
    twoFaCode += twoFAString[Math.floor(Math.random() * twoFAString.length)];
  }
  return twoFaCode;
};

export default generate2FA;
