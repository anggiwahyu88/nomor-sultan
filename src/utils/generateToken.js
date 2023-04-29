import jwt from "jsonwebtoken";
const KeyAccessToken = process.env.KeyAccessToken;
const KeyRefreshToken = process.env.KeyRefreshToken;

export function generateToken(payload, type) {
  if (type === "accessToken") {
    const accessToken = jwt.sign(payload, KeyAccessToken, { expiresIn: "20m" });
    return accessToken;
  }
  if (type === "refreshToken") {
    const refreshToken = jwt.sign(payload, KeyRefreshToken, {
      expiresIn: "1h",
    });
    return refreshToken;
  }
}
