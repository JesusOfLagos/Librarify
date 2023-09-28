import exp from "constants";
import mongoose, { Schema } from "mongoose";


export interface IUser {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
    freinds: string[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    freinds: { type: Array },
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User;