import hotelModel from "../Models/hotel.model.js";
import userModel from "../Models/user.model.js";

export async function registerHotel(req, res) {
    try {

        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        //check if the user is already register
        const hotel = await hotelModel.findOne({ owner });

        if (hotel) {
            res.json({
                success: false,
                message: "Hotel already register"
            });
        }

        await hotel.create({ name, address, contact, owner, city })

        await userModel.findByIdAndUpdate(owner, { role: "hotelOwner" });

        res.json({
            success:true,
            message:"Hotel Register Successfully"
        });


    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message,
        });
    }
}