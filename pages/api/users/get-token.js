import { checkRefreshToken } from "../../../src/utils/check-refresh-token";
import { generateToken } from "../../../src/utils/generateToken";
import cookie from "cookie";
import Users from "../../../src/db/users";

export default async function getToken(req, res) {
  if (req.method == "GET") {
    try {
      const refreshToken = req?.headers?.authorization?.split(" ")[1] || null;
      if(!refreshToken) return res.status(401).end
      
      const validate = await checkRefreshToken(refreshToken);
      const user = await Users.findOne({ where: { token: refreshToken } });
      if (validate && user) {
        const newToken = generateToken(
          { username: user.username },
          "accessToken"
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("access_token", newToken, {
            httpOnly: true,
            path: "/app",
          })
        );
        res.status(200).json({
          token: newToken,
        });
      } else {
        return res.status(401).end();
      }
    } catch (err) {
      throw err;
    }
  } else {
    res.status(400).end();
  }
}
