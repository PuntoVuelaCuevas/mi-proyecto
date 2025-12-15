const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log('Testing Email Configuration...');
    console.log('User:', process.env.EMAIL_USER);
    console.log('Pass:', process.env.EMAIL_PASS ? '****** (Set)' : '(Not Set)');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ Error: Missing EMAIL_USER or EMAIL_PASS in .env file');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        console.log('Attempting to send test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: 'Test Email from Voluntarios App',
            text: 'If you receive this, your email configuration is correct!'
        });
        console.log('✅ Success! Email sent.');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};

testEmail();
