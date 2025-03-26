import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received POST request:', req.body); // Log incoming data

    try {
      const { name, email, message } = req.body;
      console.log('Parsed data:', { name, email, message }); // Log parsed data

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

      const mailOptions = {
        from: email,
        to: 'sol.moh.azoz@gmail.com',
        cc: email,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      console.log('Sending email with options:', mailOptions); // Debug email options

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info); // Log success

      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error in email sending logic:', error); // Log error
      res.status(500).json({ success: false, message: 'Error sending email.', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}