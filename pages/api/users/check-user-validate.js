import { checkRefreshToken } from "../../../src/utils/check-refresh-token";
import tokenLastLogin from "../../../src/utils/tokenLastLogin";
import cookie from "cookie";

export default async function checkToken(req, res) {
  try {
    const refreshToken = req?.headers?.authorization?.split(" ")[1] || null;
    const validate = await checkRefreshToken(refreshToken);
    if (!validate) return res.status(401).end();

    while (tokenLastLogin[0] === refreshToken || tokenLastLogin.length === 0) {
      console.log(new Date().getTime(), tokenLastLogin);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    console.log("sucsses=>", refreshToken)

    res.setHeader("Set-Cookie", [
      cookie.serialize("access_token", "", {
        maxAge: new Date(0),
        httpOnly: true,
        path: "/app",
      }),
      cookie.serialize("refresh_token", "", {
        maxAge: new Date(0),
        httpOnly: true,
        path: "/app",
      }),
    ]);
    res.status(200).json({ message: "succses" });
  } catch (err) {
    throw err;
  }
}
