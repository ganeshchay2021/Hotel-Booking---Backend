import hotelModel from "../Models/hotel.model.js";
import { v2 as cloudinary } from 'cloudinary';
import roomModel from "../Models/room.model.js";


export async function createRoom(req, res) {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await hotelModel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            res.json({
                success: false,
                message: "No Hotel found"
            });
        }

        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);

            return response.secure_url;
        });

        //wait for all uploads to complete
        const images = await Promise.all(uploadImages);

        await roomModel.create({
            hotel: hotel._id,
            roomType,
            pricePerNigh: +pricePerNightt,
            amenities: JSON.parse(amenities),
            images,

        });

        res.json({
            success: true,
            message: "Room Created successfully"
        });


    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }

}

export async function getRooms(req, res) {
    try {
        const rooms = await roomModel.find({ isAvailabel: true }).populate({
            path:'hotel',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt:-1});

        res.json({
            success:true,
            rooms
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }

}

export async function getOwnerROoms(req, res) {
    try {

        const hotelData = await hotelModel.find({owner:req.auth.userId});

        const rooms= await roomModel.find({hotel: hotelData._Id.toString()}).populate("hotel");

        res.json({
            success:false,
            rooms,
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }

}

export async function toggleRoomAvailability(req, res) {
    try {

    const {roomId} = req.body;
    const roomData= await roomModel.findById(roomId);
    roomData.isAvailabel=!roomData.isAvailabel;
    await roomData.save();

    res.json({success:true, message: "Room Availabiity updated"});

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }

}