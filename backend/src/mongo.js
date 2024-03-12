import mongoose from "mongoose";
import config from "./config";


export default {
  connect: () => {    
    if (!config.MONGO_URL) {
      console.error("Missing MONGO_URL!!!");
      process.exit(1);
    }
    mongoose.set("strictQuery", false);
    mongoose
      .connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("mongo db connection created"));

    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:")
    );
    
  },
};
