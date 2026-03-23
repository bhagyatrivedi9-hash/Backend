import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import {mongoose} from "mongoose";

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectToDB;