import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String, required: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],

    },
    image: {
        type: String, required: [true, "Image is required"]
    },
    role: {
        type: String,
        enum: ["User", "Owner"],
        default: "User"
    },
    recentSearchCities: {
        type: String, required: [true, "recent search cities reauired"]
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;