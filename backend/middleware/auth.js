import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token, authorization denied"
        });
    }

    const token = authHeader.split(" ")[1]; // extract actual token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // now req.user.id is accessible
        next();
    } catch (err) {
        console.error("Token verification failed:", err);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired. Please login again.",
                expired: true,
            });
        }

        res.status(401).json({
            message: "Token is not valid"
        });
    }
};

export default auth;