import cookie from "cookie";
import Users from "../../../../src/db/users";

export default async function logout(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const refreshToken = req?.headers?.authorization?.split(" ")[1] || null;
        const tokenIsValid = await Users.findAll({
          where: { token: refreshToken },
        });
        if (tokenIsValid[0]) {
          await Users.update(
            {
              token: null,
            },
            { where: { username: req.query.username } }
          );
        }

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
    default:
      res.status(404).end();
  }
}
