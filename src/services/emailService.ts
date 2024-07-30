// src/services/emailService.ts

import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    console.log('Initializing EmailService...');
    console.log('Working variable example:', process.env.PORT);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    console.log('Email Configuration:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      user: process.env.EMAIL_USER,
      fromName: process.env.EMAIL_FROM_NAME,
      fromAddress: process.env.EMAIL_FROM_ADDRESS
    });
    if (!process.env.EMAIL_HOST) {
      console.error('EMAIL_HOST is undefined. Check your .env file and environment setup.');
      // Optionally, throw an error here if email configuration is critical
      // throw new Error('Email configuration is missing');
    }


    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Transporter verification failed:', error);
      } else {
        console.log('Transporter is ready to send emails');
      }
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    console.log(`Attempting to send welcome email to: ${to}`);
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to,
        subject: 'Welcome to R1P FITNESS GYM!',
        text: `Hello ${name},\n\nWelcome to R1P FITNESS GYM! We're excited to have you as a member.`,
        html: `
          <h1>Welcome to R1P FITNESS GYM!</h1>
          <p>Hello ${name},</p>
          <p>We're excited to have you as a member. Here's what you can expect:</p>
          <ul>
            <li>Access to state-of-the-art equipment</li>
            <li>Professional trainers to guide you</li>
            <li>A supportive community to motivate you</li>
          </ul>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Let's start your fitness journey together!</p>
          <p>Best regards,<br>The R1P FITNESS GYM Team</p>
        `,
      });
      console.log('Email sent successfully:', info.messageId);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  }
}
console.log('EmailService module loaded at:', new Date().toISOString());
console.log('MONGODB_URI in app.ts (before import EMAIL SERVICE PAGE):', process.env.EMAIL_HOST, process.env.EMAIL_PASS);

export const emailService = new EmailService();