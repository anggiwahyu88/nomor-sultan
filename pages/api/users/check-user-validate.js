import { checkRefreshToken } from "../../../src/utils/check-refresh-token";
import Users from "../../../src/db/users";

export default async function checkToken(req, res) {
  try {
    const refreshToken = req?.headers?.authorization?.split(" ")[1] || null;
    const validate = await checkRefreshToken(refreshToken);
    if (!validate)
      return res.status(401).json({
        isValid: false,
      });

    const users = await Users.findAll({ where: { token: refreshToken } });
    if (!users[0])
      return res.status(401).json({
        isValid: false,
      });
    res.status(200).json({
      isValid: true,
    });
  } catch (err) {
    throw err;
  }
}
