import { generateToken } from "./generateToken";
import { checkRefreshToken } from "./check-refresh-token";
import Users from "../db/users";

export async function exp(token) {
  try {
    const validate = await checkRefreshToken(token);
    if (!validate) return false;
    const user = await Users.findOne({ where: { token: token } });
    if (!user) return false;
    const newToken = generateToken({ username: user.username }, "accessToken");
    return newToken;
  } catch {
    return false;
  }
}
