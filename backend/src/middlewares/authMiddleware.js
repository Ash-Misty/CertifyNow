import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ 🔥 THIS IS THE MOST IMPORTANT LINE 🔥
    req.adminId = decoded.id;

    // (optional) full admin payload
    // req.admin = decoded;

    // 4️⃣ Move to next middleware / route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default protect;
