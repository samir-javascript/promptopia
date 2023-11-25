import { Schema, models, model } from "mongoose";

 const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    image: {type: String}
 })
 const User = models.User || model('User', UserSchema)
 export default User;