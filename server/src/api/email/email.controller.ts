import { BodyRequest, RequestHandler } from 'express';
import { Email } from './email.types';
import envs from '../../utilities/envs';

const nodemailer = require('nodemailer');
const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = envs;
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
    }
});

export const createEmail = (to: string, subject: string, content: string): Promise<unknown> =>
    transporter.sendMail({
        from: NODEMAILER_EMAIL, // Sender address
        to: to, // Recipient address
        subject: subject, // Subject line
        html: content // HTML body
    });

export const sendEmail: RequestHandler = async (req: BodyRequest<Email>, res) => {
    const { to, subject, content } = req.body;

    try {
        // Send email
        res.json(await createEmail(to, subject, content));
    } catch (error: any) {
        console.error('Error sending email: ', error.message);
        // General error response
        res.status(500).json({ error: 'Error sending email', message: error.message });
    }
};
