const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecte to MEGAMART_DB");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongoDB;
