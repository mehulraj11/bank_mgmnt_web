const jwt = require("jsonwebtoken")

const authorize = ((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "token not found" })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("authorization error : ", error.message);
        res.status(401).json({ message: error.message })
    }

})
const authorizeRoles = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" })
        }
        next();
    }
}
module.exports = { authorize, authorizeRoles };