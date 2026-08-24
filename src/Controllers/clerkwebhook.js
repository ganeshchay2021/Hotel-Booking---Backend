import userModel from "../Models/user.model.js";
import { Webhook } from "svix";
import config from "../Config/config.js";


async function clerkWebHook(req, res) {
    try {

        //create svix instance with clerk webhook secret
        const webHook = new Webhook(config.CLERK_WEBHOOK_KEY);

        //Getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        //verifing headers
        await webHook.verify(JSON.stringify(req.body), headers);

        //getting data from req body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            username: data.first_name + '' + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
        }

        //switch case for different events

        switch (type) {
            case "user.created": {
                await userModel.create(userData);
                break;
            }
            case "user.updated": {
                await userModel.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted": {
                await userModel.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        res.json({
            success: true,
            message: "Webhook is received"
        });

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

export default clerkWebHook;