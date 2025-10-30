import { StallRegistration } from "../models/stallRegistration.model.js";

// Controller to handle creating a new stall registration
export const createStallRegistration = async (req, res) => {
    try {
        const { stallName, stallOwner, email, phone, cuisineType, stallRequirements } = req.body;

        if (!stallName || !stallOwner || !email || !phone) {
            console.log("Missing required fields: stallName, stallOwner, email, or phone");
            return res.status(400).json({ message: "Stall name, stall owner, email, and phone are required." });
        }

        const newStallRegistration = await StallRegistration.create({
            stallName,
            stallOwner,
            email,
            phone,
            cuisineType,
            stallRequirements
        });

        res.status(201).json({ message: "Stall registration created successfully", data: newStallRegistration });
    } catch (error) {
        console.error("Error creating stall registration:", error);
        res.status(500).json({ message: "Server Error" });
    }
};