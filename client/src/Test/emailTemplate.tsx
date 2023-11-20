import { Body, Container, Column, Head, Heading, Html, Img, Link, Preview, Row, Section, Text } from '@react-email/components';
import * as React from 'react';

interface SlackConfirmEmailProps {
    reservationNumber: string;
    reservationDate: Date;
    reservationStatus: string;
}

const baseUrl = "google.com";

export const SlackConfirmEmail = ({ reservationNumber, reservationDate, reservationStatus }: SlackConfirmEmailProps) => (
    <Html>
        <Head />
        <Preview>Confirm your email address</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logoContainer}>
                    <Img src={`${baseUrl}/static/slack-logo.png`} width="120" height="36" alt="Slack" />
                </Section>
                <Heading style={h1}>Reservation Details</Heading>
                <Text style={heroText}>The details of your reservation are as follows:</Text>

                <Section style={codeBox}>
                    <Row>
                        <Text style={confirmationCodeText}>Reservation Number: {reservationNumber}</Text>
                    </Row>
                    <Row>
                        <Text style={confirmationCodeText}>Reservation Date: {reservationDate}</Text>
                    </Row>
                    <Row>
                        <Text style={confirmationCodeText}>Reservation Status: {reservationStatus}</Text>
                    </Row>
                </Section>

                <Text style={text}>If the following details on this email are incorrect, please contact the admin or the staff regarding your reservation.</Text>

                <Section>
                    <Row style={footerLogos}>
                        <Column style={{ width: '66%' }}>
                            <Img src={`${baseUrl}/static/slack-logo.png`} width="120" height="36" alt="Slack" />
                        </Column>
                    </Row>
                </Section>

                <Section>
                    <Text style={footerText}>
                        Ponte Verde Dr, Marikina, <br />
                        1809 Metro Manila <br />
                        <br />
                        0917 147 2643
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default SlackConfirmEmail;

const footerText = {
    fontSize: '12px',
    color: '#b7b7b7',
    lineHeight: '15px',
    textAlign: 'left' as const,
    marginBottom: '50px'
};

const footerLink = {
    color: '#b7b7b7',
    textDecoration: 'underline'
};

const footerLogos = {
    marginBottom: '32px',
    paddingLeft: '8px',
    paddingRight: '8px',
    width: '100%'
};

const socialMediaIcon = {
    display: 'inline',
    marginLeft: '32px'
};

const main = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
};

const container = {
    maxWidth: '600px',
    margin: '0 auto'
};

const logoContainer = {
    marginTop: '32px'
};

const h1 = {
    color: '#1d1c1d',
    fontSize: '36px',
    fontWeight: '700',
    margin: '30px 0',
    padding: '0',
    lineHeight: '42px'
};

const heroText = {
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '30px'
};

const codeBox = {
    background: 'rgb(245, 244, 245)',
    borderRadius: '4px',
    marginRight: '50px',
    marginBottom: '30px',
    padding: '43px 23px'
};

const confirmationCodeText = {
    fontSize: '30px',
    textAlign: 'center' as const,
    verticalAlign: 'middle'
};

const text = {
    color: '#000',
    fontSize: '14px',
    lineHeight: '24px'
};
