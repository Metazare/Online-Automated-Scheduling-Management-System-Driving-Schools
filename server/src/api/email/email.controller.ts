import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const generateOTP = () => {
    const numbers = '0123456789'; // Define the numbers to be used in the OTP
    let otp = '';

    for (let i = 0; i <= 6; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        otp += numbers.charAt(randomIndex);
    }

    return otp;
}

export const sendEmailOtp = () => {
    const email = 'delivered@resend.dev'; // the email address you want to send the email to

    resend.emails.send({
        from: 'onboarding@resend.dev',      // use the domain address of the email
        to: email,                          // the email address you want to send the email to
        subject: 'Hello World',             // the email subject/header
        react: '<strong>It works!</strong>' // the email body; Email(); Call the template as a function
    });
}