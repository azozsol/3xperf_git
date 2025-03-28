// app/api/contact/emailTemplate.js

export const getEmailTemplate = ({ name, email, phone, subject, message }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
    <!-- Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <!-- Logo Section -->
            <tr>
              <td align="center" style="padding: 20px 0; background-color: #e5e5e5;">
                <img
                  src="http://localhost:3000/images/logo.svg"
                  alt="Company Logo"
                  width="150"
                  style="display: block; max-width: 150px; height: auto;"
                />
              </td>
            </tr>

            <!-- Data Section with Gray Background -->
            <tr>
              <td style="padding: 20px; background-color: #e5e5e5;">
                <h2 style="margin: 0 0 15px; color: #333333;">New Contact Form Submission</h2>
                <table role="presentation" width="100%" cellpadding="5" cellspacing="0">
                  <tr>
                    <td width="30%" style="color: #555555; font-weight: bold;">Name:</td>
                    <td style="color: #333333;">${name}</td>
                  </tr>
                  <tr>
                    <td style="color: #555555; font-weight: bold;">Email:</td>
                    <td style="color: #333333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="color: #555555; font-weight: bold;">Phone:</td>
                    <td style="color: #333333;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="color: #555555; font-weight: bold;">Subject:</td>
                    <td style="color: #333333;">${subject || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="color: #555555; font-weight: bold;">Message:</td>
                    <td style="color: #333333;">${message || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer Image Section -->
            <tr>
              <td align="center" style="padding: 20px; background-color: #e5e5e5;">
                <img
                  src="http://localhost:3000/images/footerImage.svg"
                  alt="Footer Image"
                  width="100%"
                  style="display: block; max-width: 600px; height: auto; border-radius: 0 0 8px 8px;"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;