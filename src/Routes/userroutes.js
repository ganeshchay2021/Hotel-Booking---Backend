import express from "express";
import { authMiddleWare } from "../Middlewares/authmiddleware.js";
import { getUserController, storeRecentSearchCities } from "../Controllers/usercontroller";

const userRouter= express.Router();

userRouter.get("/",authMiddleWare, getUserController );
userRouter.post("/store-recent-search",authMiddleWare, storeRecentSearchCities );


export default userRouter;