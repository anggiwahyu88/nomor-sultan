import jwt from "jsonwebtoken";
const KeyRefreshToken = process.env.KeyRefreshToken;

export async function checkRefreshToken(refreshToken) {
  try {
    const validate = jwt.verify(refreshToken, KeyRefreshToken);
    const currentDate = new Date();
    if (validate.exp * 1000 <= currentDate.getTime()) return false;
    return validate.id;
  } catch {
    return false;
  }
}
