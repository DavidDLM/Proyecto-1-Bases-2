const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authGuard = (req, res, next) => {
    const {authorization} = req.headers;
    try {
        const token = authorization.split(" ")[1];

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        const {email, _id, role} = decode;
        req.email = email;
        req.userID = _id;
        req.role = role;
        console.log(role);
        if (role != "admin") {
            next(createError(401, "Unauthorized Request."));
        }
        next();
    } catch (err) {
        if (err.message === "jwt expired") {
            next(
                createError(419, "Session Expired! Please Login to Continue.")
            );
        } else {
            next(
                createError(
                    401,
                    "Authentication Failure! Please Login to Continue."
                )
            );
        }
    }
};
module.exports = authGuard;
