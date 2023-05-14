import { generateToken } from "../../src/utils/generateToken";
import { errRes } from "../../src/utils/err";
import cookie from "cookie";
import Users from "../../src/db/users";
import { hash } from "../../src/utils/hash";

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
          const compare = hash(password);
          if (compare !== user.password) return errRes(400, res, "data not found");
          const accessToken = generateToken({ id: user._id }, "accessToken");
          const refreshToken = generateToken(
            { id: user._id, role: "admind" },
            "refreshToken"
          );
          const isUserUpdate = await Users.update(
            { token: refreshToken },
            { where: { _id: user._id } }
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
        console.log(err);
        return errRes(400, res, "something wrong");
      }
    default:
      res.status(404).end();
  }
}
