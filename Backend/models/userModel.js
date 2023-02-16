const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: {unique: true},
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: 0,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model("User", userSchema);
