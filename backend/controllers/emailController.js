import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import User from '../models/userModel.js';

// console.log(User);


// Fixed OAuth2 client setup and token refresh
const getOAuth2Client = async (userId) => {
    console.log('getOAuth2Client called with userId:', userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found for userId:', userId);
            throw new Error('User not found');
        }

        if (!user.googleTokens) {
            console.error(`User ${userId} has no Google tokens. Authentication required.`);
            throw new Error('User has no Google credentials. Please re-authenticate.');
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `${process.env.SERVER_URL}/api/auth/google/callback`
        );

        oauth2Client.setCredentials({
            access_token: user.googleTokens.access_token,
            refresh_token: user.googleTokens.refresh_token,
            expiry_date: user.googleTokens.expiry_date
        });

        // Check if token needs refresh
        if (oauth2Client.isTokenExpiring()) {
            console.log('Token is expiring, attempting refresh...');
            try {
                const { credentials } = await oauth2Client.refreshAccessToken();
                oauth2Client.setCredentials(credentials);
                
                // Update user's tokens in database
                await User.findByIdAndUpdate(userId, {
                    'googleTokens.access_token': credentials.access_token,
                    'googleTokens.expiry_date': credentials.expiry_date
                });
                console.log('Token refreshed successfully');
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                throw new Error('Token refresh failed. Please re-authenticate.');
            }
        }

        return oauth2Client;
    } catch (error) {
        console.error('OAuth2 client error:', error);
        throw new Error('Authentication error: ' + error.message);
    }
};

// ...existing code for getOAuth2Client function...

export const sendEmail = async (req, res) => {
    const { to, subject, body } = req.body;
    const userData = await User.findById(req.user.id);
    if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }
    // console.log('req.user:', userData); // Add this line
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    // console.log('sendEmail called with userId:', userId); // Add this line

    if (!to || !subject || !body) {
        return res.status(400).json({ success: false, message: 'Recipient, subject, and body are required.' });
    }

    try {
        const oauth2Client = await getOAuth2Client(userId);
        const accessToken = oauth2Client.credentials.access_token;
        console.log('client id : ', oauth2Client.credentials);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: userData.email, // Assuming user email is available
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: oauth2Client.credentials.refresh_token,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: req.user.email,
            to: to,
            subject: subject,
            html: body,
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, messageId: info.messageId, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Send email error:', error);
        if (error.response) {
            console.error('Error Response:', error.response.data);
        } else {
            console.error('Full Error Object:', error);
        }

        if (error.name === 'AuthenticationError') {
            return res.status(401).json({ success: false, message: error.message });
        }
        if (error.code === 'EAUTH' || (error.response && error.response.status === 401)) {
            return res.status(401).json({ success: false, message: 'Authentication failed. Please re-authenticate with Google.' });
        }
        res.status(500).json({ success: false, message: 'An unexpected error occurred while sending the email.' });
    }
};