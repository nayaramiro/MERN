import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: "Token not provided" });
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
      return res.status(401).send({ message: "Invalid token format" });
    }

    const [schema, token] = parts;
    if (schema !== "Bearer") {
      return res.status(401).send({ message: "Invalid token type" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token invalid" });
      }

      const user = await userService.findUserByIdService(decoded.id);
      if (!user || !user.id) {
        return res.status(401).send({ message: "User not found" });
      }

      req.userID = user.id; // 🔹 sera disponible dans ton contrôleur
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
