import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

//next pour poursuivre le code
export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.send(401);
    }
    // séparer une phrase depuis un espace
    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }
    // je décompose mon parts, le premier sera schema et le deuxième le token
    const [schema, token] = parts;
    if (schema !== "Bearer") {
      return res.send(401);
    }
    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({
          message: "Token unvalid",
        });
      }
      console.log(decoded);

      // check si token existe mais que l'utilisateur n'existe plus
      const user = await userService.findUserByIdService(decoded.id);
      console.log(user);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Inavlid token!" });
      }
      // j'envoie à mon req le id de mon DB findeByID depuis mon id depuis mon token
      req.userID = user.id;
    });

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
