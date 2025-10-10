import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";
const login = async (req, res) => {
  const { email, password } = req.body;

  // il faut trouver le user à qui appartient
  // ce mail pour ensuite faire une vérification de password
  try {
    const user = await loginService(email);

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    //res.send("test");
    if (!passwordIsValid || !user) {
      return res.status(400).send({ message: "User or password not found" });
    }
    const token = generateToken(user.id)

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
