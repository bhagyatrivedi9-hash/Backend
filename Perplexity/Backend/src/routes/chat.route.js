import {Router} from 'express';
import {sendMessage} from "../controller/chat.controller.js";
const router = Router();

router.post("/messages", sendMessage);

export default router;