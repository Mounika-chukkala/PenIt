const { verifyJWT } = require("../utils/generateToken");

const verifyUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        // let token = req.headers.authorization.replace("Bearer ","")

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please sign in",
            });
        }

        try {
            let user = await verifyJWT(token);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Please sign in",
                });
            }
            // console.log("1")
            req.user = user.id;
            next();
        } catch (err) {}
    } catch (err) {
            console.error("❌ JWT Verification Failed:", err.message);
        return res.status(400).json({
            success: false,
            message: "Tok en missing",
        });
    }
};

module.exports = verifyUser;