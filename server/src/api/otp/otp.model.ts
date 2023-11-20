import { Schema, model } from 'mongoose';

const otpSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
            required: true
        },
        code: {
            type: String,
            unique: true,
            required: true
        }
    }
);

export default model('OTP', otpSchema)