import { Message } from "../models/message.model.js";

// Controller to handle creating a new message
export const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            console.log("Missing required fields: name, email, or message");
            return res.status(400).json({ message: "Name, email, and message are required." });
        }

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({ message: "Message created successfully", data: newMessage });
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Server Error" });
    }
};