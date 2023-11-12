import { Schema, model } from 'mongoose';

const emailOTPSchema = new Schema(
    {
        reciever: {
            type: String,
            unique: true,
            match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
            required: true
        },
        otp: {
            type: String,
            unique: true,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
);

export default model('EmailOTP', emailOTPSchema)