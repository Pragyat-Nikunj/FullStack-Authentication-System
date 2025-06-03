import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MONGODB successfully connected');  
        });
        connection.on('error', (err) => {
            console.log('MONGODB connection error, Please try again.');
            process.exit();
            
        })
    }
    catch (error) {
        console.log("Something Went Wrong while connecting to database.");
        console.error(error);
        
    }
}