import mongoose from "mongoose";

const stallRegistrationSchema = new mongoose.Schema({
    stallName: {
        type: String,
        required: true,
        trim: true
    },
    stallOwner: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    cuisineType: {
        type: String,
        trim: true
    },
    stallRequirements: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export const StallRegistration = mongoose.model("StallRegistration", stallRegistrationSchema);