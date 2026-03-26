import {Router} from 'express';
import {sendMessage,getChats,getMessages,deleteChat} from "../controller/chat.controller.js";
import {authUser} from "../middleware/auth.middleware.js";
const router = Router();

router.post("/messages",  authUser,sendMessage);
router.get("/", authUser, getChats);
router.get("/messages/:chatId", authUser, getMessages);
router.delete("/delete/:chatId", authUser, deleteChat);

export default router;