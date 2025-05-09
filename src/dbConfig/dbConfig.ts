import mongoose from "mongoose";
export async function connect() {
    try {
        console.log(process.env.MONGO_URI);
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected Successfully');
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is connected' + err);
            process.exit();
        })
    } catch (error) {
        console.log('something went wrong');
        console.log(error);

    }
}