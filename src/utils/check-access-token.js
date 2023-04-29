import jwt from "jsonwebtoken";

const KeyAccessToken = process.env.KeyAccessToken;

export async function checkAccessToken(accessToken) {
  try {
    const validate = jwt.verify(accessToken, KeyAccessToken);
    const currentDate = new Date();
    if (validate.exp * 1000 <= currentDate.getTime()) return false;
    return {
      username: validate.username,
      exp: validate.exp,
    };
  } catch {
    return false;
  }
}
