import jwt from "jsonwebtoken";
const { verify } = jwt;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.statusMessage = "Authorization required";
    res.status(401).json({ message: "Authorization required" });
  } else {
    try {
      const token = authHeader.split(" ")[1];
      verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.statusMessage = "Invalid credentials";
      return res.status(403).json({ message: "Invalid credentials" });
    }
  }
};
export { auth };
