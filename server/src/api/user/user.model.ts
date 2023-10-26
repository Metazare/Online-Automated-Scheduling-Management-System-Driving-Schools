import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { model, Schema } from 'mongoose';
import { UserDocument } from './user.types';

const userSchcema = new Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
        unique: true,
        default: id
    },
    name: {
        type: Schema.Types.Mixed,
        required: [true, 'Name is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    contact: {
        type: String,
        required: [true, 'Contact is required']
    },
    sex: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '"{VALUE}" is not a valid sex'
        }
    },
    birthday: Date,
    credentials: {
        type: {
            email: {
                type: String,
                required: [true, 'Email is required'],
                match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                unique: true
            },
            password: {
                type: String,
                required: [true, 'Password is required'],
                set: (value: string): string => hashSync(value, 10)
            }
        },
        required: [true, 'User credentials are required']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'student', 'instructor'],
            message: '"{VALUE}" is not a valid role'
        },
        required: [true, 'Role is required']
    }
});

export default model<UserDocument>('User', userSchcema);
