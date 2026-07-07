import jwt from "jsonwebtoken";
import { getJwtConfig } from "../config/jwt.js";

const generateToken = (user) => {
  const { secret, expiresIn } = getJwtConfig();

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn,
    },
  );
};

export { generateToken };
