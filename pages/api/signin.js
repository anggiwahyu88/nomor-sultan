import { errRes } from "../../src/utils/err";
import { hash } from "../../src/utils/hash";
import Users from "../../src/db/users";

export default async function signin(req, res) {
  if (req.method == "POST") {
    const { username, password } = req.body;
    try {
      const encryptedPassword = hash(password);
      const users = await Users.create({
        username,
        password: encryptedPassword,
      });
      if (!users) {
        errRes(400, res, { error_message: "tes" });
      } else {
        res.status(200).json({
          registered: users,
          message: "Register berhasil, silahkan login",
        });
      }
    } catch (err) {
      errRes(400, res, { err });
    }
  } else {
    res.status(404).end();
  }
}
