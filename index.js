require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure the email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use any SMTP provider
    auth: {
        user: 'iedcemeadeveloper@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
app.post('/api/send-report', async (req, res) => {
    const { location, type, description, recipientEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // From email
        to: "nivedithat2006@gmail.com",// recipientEmail 
        subject: `Emergency Report: ${type}`,
        text: `Location: ${location}\n\nDescription: ${description}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Report sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send report' });
    }
});


app.listen(5000, () => console.log('Server running on port 5000'));
