import mongoose from "mongoose";


const connectDB = async () => {
    mongoose.set('strictQuery', true);
    return await mongoose.connect(process.env.DB_LOCAL).then(result => {
        console.log('connected to DB  ........');
    }).catch(err => console.log('error.....' ,err));
};

export default connectDB;