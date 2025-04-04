import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getEmailTemplate } from './emailTemplate'; 
import { html } from 'motion/react-client';

export async function POST(request) {
  try {
    // Parse the incoming form data
    const formData = await request.json();
    const { name, email, phone, subject, message } = formData;

    console.log('Received POST request:', formData); // Log incoming data

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const escapeHtml = (unsafe) => {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    const emailHtml = getEmailTemplate({
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    });

    const mailOptions = {
      from: email, // Sender's email (from the form)
      to: 'sol.moh.azoz@gmail.com', // Your email
      cc: email, // CC to the sender
      subject: `New Contact Form Submission from ${name}`,
      // text: emailHtml,
      html: emailHtml
    };

    console.log('Sending email with options:', mailOptions); // Debug email options

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info); // Log success

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in email sending logic:', error); // Log error
    return NextResponse.json(
      { success: false, message: 'Error sending email', error: error.message },
      { status: 500 }
    );
  }
}