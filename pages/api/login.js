const bcrypt = require("bcrypt");
import { generateToken } from "../../src/utils/generateToken";
import { errRes } from "../../src/utils/err";
import cookie from "cookie";
import Users from "../../src/db/users";

function userValidation(data) {
  if (!data.username || !data.password) {
    return false;
  } else if (data.username.length <= 6 || data.password.length <= 6) {
    return false;
  } else return true;
}

export default async function login(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { username, password } = req.body;
        const validate = userValidation(req.body);
        if (validate) {
          const user = await Users.findOne({ where: { username: username } });
          if (!user) return errRes(400, res, "data not found");

          const compare = bcrypt.compareSync(password, user?.password || null);
          if (!compare) return errRes(400, res, "data not found");

          const accessToken = generateToken(
            { username: username },
            "accessToken"
          );
          const refreshToken = generateToken(
            { username: username, role: "admind" },
            "refreshToken"
          );
          const isUserUpdate = await Users.update(
            { token: refreshToken },
            { where: { username: username }, individualHooks: true }
          );
          if (isUserUpdate[0] === 0) throw Error;

          res.setHeader("Set-Cookie", [
            cookie.serialize("access_token", accessToken, {
              httpOnly: true,
              path: "/app",
            }),
            cookie.serialize("refresh_token", refreshToken, {
              httpOnly: true,
              path: "/app",
            }),
          ]);
          res.status(200).json({
            message: "login succses",
          });
        } else {
          throw Error;
        }
      } catch (err) {
        return errRes(400, res, "something wrong");
      }
    default:
      res.status(404).end();
  }
}
