import { hash, compare } from "bcrypt";
import { insertUser, searchUserByEmail } from "../models/User.js";
import { ApiError } from "../helpers/apiError.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || email.length === 0)
      return next(new ApiError("Invalid email", 400));
    if (!password || password.length < 8)
      return next(new ApiError("Invalid password", 400));

    const hashedPassword = await hash(password, 10);
    const result = await insertUser(email, hashedPassword);
    const user = result.rows[0];
    res.status(201).json(createUserObj(user.id, user.email));
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await searchUserByEmail(email);

    if (result.rowCount === 0)
      return next(new ApiError("Invalid credentials", 400));

    const user = result.rows[0];
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return next(new ApiError("Invalid password", 401));

    const token = sign({ user: email }, process.env.JWT_SECRET);

    return res.status(200).json(createUserObj(user.id, user.email, token));
  } catch (error) {
    return next(error);
  }
};

const createUserObj = (id, email, token = undefined) => {
  return {
    id: id,
    email: email,
    ...(token !== undefined && { token: token }),
  };
};

export { registration, login };
