import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async ()=> {
    mongoose.set('strictQuery', true)
    if(isConnected) {
        console.log('mongodb is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, {
            dbName: 'promptopiasita',
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('mongodb is connected successfuly')
        isConnected = true;
    } catch (error) {
        console.log('error connectong to db',error)
    }
}
