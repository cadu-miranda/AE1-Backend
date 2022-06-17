import jwt from "jsonwebtoken";
import AuthConfig from "../config/AuthConfig";

const generateToken = (params = {}) =>
  jwt.sign(params, AuthConfig.secret, {
    expiresIn: 86400, // 1 day
  });

export default generateToken;
