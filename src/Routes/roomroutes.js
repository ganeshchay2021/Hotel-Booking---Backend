import express from "express";
import upload from "../Middlewares/uploadmiddleware";
import { createRoom, getOwnerROoms, getRooms, toggleRoomAvailability } from "../Controllers/roomcontroller";
import { authMiddleWare } from "../Middlewares/authmiddleware";

const roomRouter = express.Router();

roomRouter.post('/', upload.array("images", 4), authMiddleWare, createRoom);

roomRouter.get('/', getRooms);

roomRouter.get('/owner', authMiddleWare, getOwnerROoms);

roomRouter.post('/toggle-availability', authMiddleWare, toggleRoomAvailability);




export default roomRouter;