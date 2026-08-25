import express from "express";
import { authMiddleWare } from "../Middlewares/authmiddleware.js";
import { registerHotel } from "../Controllers/hotelcontroller.js";

const hotelRouter=express.Router();

hotelRouter.post('/', authMiddleWare, registerHotel);

export default hotelRouter;