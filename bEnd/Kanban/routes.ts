import { Router } from "@oak/oak";

import {
    getUsers,
    loginUser,
    logoutUser,
    refreshUser,
    registerUser,
} from "./https/controllers/user.controller.ts";
import {
    getColumns,
    getSections,
} from "./https/controllers/data.controller.ts";
import { validateUser } from "./https/validators/userValidator.ts";
import { authHandler } from "./https/middleware/authHandler.ts";
import websocketHandler from "./websockets/controllers/broadcasterController.ts";
import { FileUploader } from "./https/middleware/fileUploadHandler.ts";

const router = new Router();

// TODO: to add auth handlers !

// Auth routes
router.post("/signup", validateUser, registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshUser);

// Data retrieval routes
router.get("/sections", authHandler, getSections);
router.get("/columns/:boardId", authHandler, getColumns);
router.get("/users", authHandler, getUsers);

// File upload
const fileUploadHandler = new FileUploader("uploads").handler();
router.post("/profile_pic", fileUploadHandler);

// Web Sockets
router.get("/ws", websocketHandler.handleSocket);

export default router;
