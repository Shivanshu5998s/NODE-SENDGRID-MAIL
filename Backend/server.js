const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const port = 5000;

// 100 mails per day
// Use the API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "shivanshuc1998@gmail.com",
    from: "sourabh.bhor@in.spundan.com",
    subject: `Contact Form Submission from ${name}`,
    text: `Message from ${message}`,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});