import { Schema, Types, model } from 'mongoose';
import { id } from '../../utilities/ids';

const emailOTPSchema = new Schema(
    {
        emailID: {
            type: String,
            required: true,
            default: id
        },
        reciever: {
            type: String,
            unique: true,
            match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
);