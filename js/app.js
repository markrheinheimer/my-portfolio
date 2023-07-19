const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle the form submission
app.post('/submit-guestbook', (req, res) => {
  const { name, email, message } = req.body;

  // Save the data to a database or file if desired
  // For simplicity, let's just log the data for now
  console.log('Submitted Data:', { name, email, message });

  // Send an email with the data using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'rheins22@gmail.com', // Replace with your Gmail email address
      clientId:
        '992511733470-cgd3kj8g2ssugnhkkjh3eh96ggal23fo.apps.googleusercontent.com', // Replace with your client ID from GCP
      clientSecret: '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', // Replace with your client secret from GCP
      refreshToken: 'your-refresh-token', // Replace with your refresh token obtained using OAuth2
    },
  });

  const mailOptions = {
    from: 'rheins22@gmail.com',
    to: 'rheinheimers@protonmail.com', // Replace with your email
    subject: 'New Guestbook Entry',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Thank you for your entry!');
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
