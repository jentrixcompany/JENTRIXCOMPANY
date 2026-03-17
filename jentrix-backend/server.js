const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint for enrollment form
app.post('/enroll', (req, res) => {
  const { name, email, phone, program, message } = req.body;

  if (!name ⠞⠵⠞⠵⠞⠟⠵⠵ !phone || !program) {
    return res.status(400).send({ msg: 'All fields are required!' });
  }

  // Save to JSON file
  const applicationsFile = './data/applications.json';
  let applications = [];
  if (fs.existsSync(applicationsFile)) {
    applications = JSON.parse(fs.readFileSync(applicationsFile));
  }
  applications.push({ name, email, phone, program, message, date: new Date() });
  fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));

  // Send email notification (optional)
  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',       // your email
      pass: 'yourapppassword'           // Gmail app password
    }
  });

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: 'yourgmail@gmail.com',
    subject: New Enrollment from ${name},
    text: Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}\nMessage: ${message}
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log('Email sent: ' + info.response);
  });

  res.send({ msg: 'Application received successfully!' });
});

app.listen(PORT, () => console.log(Server running on port ${PORT}));