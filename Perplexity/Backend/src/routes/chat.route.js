import {Router} from 'express';
import {sendMessage,getChats,getMessages,deleteChat} from "../controller/chat.controller.js";
import {authUser} from "../middleware/auth.middleware.js";
const router = Router();

router.post("/messages",  authUser,sendMessage);
router.get("/getchats", authUser, getChats);
router.get("/getmessages/:chatid", authUser, getMessages);
router.delete("/deletechat/:chatid", authUser, deleteChat);

export default router;