import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { OTP } from './otp.types';
import { Resend } from 'resend';
import { UnprocessableEntity } from '../../utilities/errors';
import envs from '../../utilities/envs';

const { RESEND_KEY } = envs;
const resend = new Resend(RESEND_KEY);

export const createOTP: RequestHandler = async (req: BodyRequest<OTP>, res) => {
    const { email, code } = req.body;

    const checker = new CheckData();
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Email Verification',
        html: `Your One Time Password (OTP) is: <b>${code}</b>`
    })

    res.sendStatus(201);
}