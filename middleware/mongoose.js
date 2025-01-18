import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    if (mongoose.connection.readyState) { // Check the correct property
        return handler(req, res);
    }
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return handler(req, res);
};

export default connectDb;
