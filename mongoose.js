const mongoose = require("mongoose"); // MongoDB object modeling tool

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI); // Connect to the MongoDB Atlas URI specified in the environment variables
    console.log("connected to mongodb ✅"); // Log a success message if the connection is successful
  } catch (error) {
    console.log(error); // Log any errors that occur during the connection process
  }
};

module.exports = {
  mongooseConnect,
};
