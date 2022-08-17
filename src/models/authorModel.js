const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        author_id:{type:Number,required:true},
        author_name: {
            type: String,
            unique: true
        },
        age: Number,
        address: String,
    },
    { timestamps: true }
);



module.exports = mongoose.model("NewAuthor", authorSchema);