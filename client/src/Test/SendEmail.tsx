import { SlackConfirmEmail } from './emailTemplate';
// import { Resend } from 'resend';

import React from 'react';
// import { Button } from '@react-email/components';
import { FormLabel  } from "@mui/material"
import { Input } from '@mui/material';
import axios from 'axios';

// const resend = new Resend(process.env.RESEND_KEY);

interface sendingEmail {
    from: string;
    to: string;
    subject: string;
    react: any;
}

const dateAsString = '2023-11-10T12:00:00Z';

const SendEmails = () => {

    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData: Record<string, string> = {};
        try{
            await axios
            .post('/otp', {
                from: 'v0h7H@example.com',
                to: 'deuzaxel@gmail.com',
                subject: 'Slack Confirm Email',
                react: SlackConfirmEmail({
                    reservationNumber: '12345',
                    reservationDate: new Date(dateAsString),
                    reservationStatus: 'Pending',
                })
            })
            .then((response:any)=>{
                console.log(response.data);
                alert("Email sent!");
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input id="firstName" name="firstName" />
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" name="email" />
            <button
                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                type="submit"
            >
                Sign Up
            </button>
        </form>
    );
}

export default SendEmails;