const mongoose = require("mongoose");
const DocumenntSchema = new mongoose.Schema(
    {
        author: {
            type: String,
        },
        title: String,
        duration: Number,
        reactions: {
            likes: Number,
            dislikes: Number,
        },
        iframe: String,
        description: String,
    },
    {timestamps: true}
);

module.exports = mongoose.model("Documennts", DocumenntSchema);
