import express from "express";
import cors from 'cors';
import { clerkMiddleware } from "@clerk/express";
import clerkWebHook from "./Controllers/clerkwebhook.js";

const app = express();

app.use(cors())     //enable cross origin resources sharing


/*
* Middlewares
*/
app.use(express.json());
app.use(clerkMiddleware())


app.post(
    "/api/webhooks/clerk",
    express.raw({ type: "application/json" }),
    clerkWebHook
);


/*
*   API to listen clerk webhooks
*/
// app.use("/api/clerk", clerkWebHook)


app.get('/', (req, res) => {
    res.send("API is Working");
});

export default app;