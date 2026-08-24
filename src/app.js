import express from "express";
import cors from "cors";
import clerkWebHook from "./Controllers/clerk.controller.js";

const app = express();

app.use(cors());

// IMPORTANT: Clerk webhook BEFORE express.json()
app.post(
    "/api/webhooks/clerk",
    express.raw({ type: "application/json" }),
    clerkWebHook
);

// JSON middleware AFTER webhook
app.use(express.json());
app.use(clerkWebHook());

app.get("/", (req, res) => {
    res.send("API is Working");
});

export default app;