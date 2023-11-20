export interface OTP {
    email: string;
    code: number;
}

export interface OTPDocument extends OTP, Document {
    createdAt: Date;
    updatedAt: Date;
}