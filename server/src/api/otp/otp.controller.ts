import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { OTP } from './otp.types';
import { Resend } from 'resend';
import { UnprocessableEntity } from '../../utilities/errors';
import envs from '../../utilities/envs';
import otpModel from './otp.model';

const { RESEND_KEY } = envs;
const resend = new Resend(RESEND_KEY);

export const createOTP: RequestHandler = async (req: BodyRequest<OTP>, res) => {
    const { email, code } = req.body;

    const checker = new CheckData();
    checker.checkType(email, 'string', 'email');
    checker.checkType(code, 'number', 'code');

    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    await otpModel.findOneAndUpdate({ email }, { code }, { upsert: true });
    await resend.emails.send({
        from: 'verification@oasms.dev',
        to: email,
        subject: 'Email Verification',
        react: `This is your code: <b>${code}</b>`
    })

    res.sendStatus(201);
}