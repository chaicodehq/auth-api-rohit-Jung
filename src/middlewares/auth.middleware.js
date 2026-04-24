import { User } from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

/**
 * TODO: Authenticate user using JWT
 *
 * 1. Extract Authorization header from req.headers.authorization
 * 2. Check if header exists and starts with "Bearer "
 *    - If not: return 401 with { error: { message: "No token provided" } }
 * 3. Extract token (split by space and get second part)
 * 4. Verify token using verifyToken(token) - wrap in try/catch
 *    - If invalid: return 401 with { error: { message: "Invalid token" } }
 * 5. Find user by decoded.userId
 *    - If not found: return 401 with { error: { message: "Invalid token" } }
 * 6. Attach user to req.user
 * 7. Call next()
 */
export async function authenticate(req, res, next) {
  try {
    const header = req.headers?.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        error: { message: "No token provided" },
      });
    }

    const token = header.split(" ")[1];

    // Returns: { userId: '123', email: 'user@example.com', iat: 1234567890, exp: 1234654290 }
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        error: { message: "Invalid token" },
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user._id) {
      return res.status(401).json({
        error: { message: "Invalid token" },
      });
    }

    // put the user in req
    req.user = user;
    next();
    // Your code here
  } catch (error) {
    return res.status(401).json({ error: { message: "Invalid token" } });
  }
}
