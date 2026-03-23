import 'dotenv/config'; 
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";
import http from "http";
import {initSocket} from "./src/socket/server.socket.js";

const PORT = 3000;
const server = http.createServer(app);
connectToDB();
initSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});