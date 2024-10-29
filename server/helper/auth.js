import jwt from "jsonwebtoken";
const { verify } = jwt;

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.statusMessage = "Authorization required";
    res.status(401).json({ message: "Authorization required" });
  } else {
    try {
      const token = req.headers.authorization;
      verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      res.statusMessage = "Invalid credentials";
      res.status(403).json({ message: "Invalid credentials" });
      next(error);
    }
  }
};
export { auth };
