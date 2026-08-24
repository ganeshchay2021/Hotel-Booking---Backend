import userModel from "../Models/user.model.js";
import { Webhook } from "svix";
import config from "../Config/config.js";

async function clerkWebHook(req, res) {
    try {
        console.log("========== CLERK WEBHOOK ==========");

        const webHook = new Webhook(config.CLERK_WEBHOOK_KEY);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        console.log("Headers:", headers);

        // req.body is Buffer because of express.raw()
        const payload = req.body.toString();

        console.log("Payload received");

        // Verify webhook
        const { data, type } = await webHook.verify(payload, headers);

        console.log("Webhook type:", type);
        console.log("Clerk user ID:", data.id);

        const userData = {
            _id: data.id,
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            email: data.email_addresses?.[0]?.email_address,
            image: data.image_url,
        };

        console.log("User data:", userData);

        switch (type) {

            case "user.created":
                await userModel.create(userData);
                console.log("✅ User created in MongoDB");
                break;

            case "user.updated":
                await userModel.findByIdAndUpdate(
                    data.id,
                    userData,
                    { new: true }
                );
                console.log("✅ User updated in MongoDB");
                break;

            case "user.deleted":
                await userModel.findByIdAndDelete(data.id);
                console.log("✅ User deleted from MongoDB");
                break;

            default:
                console.log("Unhandled webhook type:", type);
        }

        return res.status(200).json({
            success: true,
            message: "Webhook received",
        });

    } catch (error) {
        console.error("❌ Webhook Error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export default clerkWebHook;